// email.js
import brevo from "@getbrevo/brevo";
import { sendErrorLog } from "../discord-webhook/error.js";

let defaultClient = brevo.ApiClient.instance;
let apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API;
let contactsApi = new brevo.ContactsApi();
let transactionalEmailsApi = new brevo.TransactionalEmailsApi();

const createContact = async (email, firstName) => {
  try {
    let createContactRequest = new brevo.CreateContact();
    createContactRequest.email = email;
    createContactRequest.listIds = [19];
    createContactRequest.attributes = {
      FIRSTNAME: firstName,
    };

    const contactData = await contactsApi.createContact(createContactRequest);
    console.log(
      "Contact created successfully. Returned data: " +
        JSON.stringify(contactData),
    );

    return contactData;
  } catch (error) {
    console.error("Error creating contact:", error);
    throw error;
  }
};

const sendEmail = async (recipientEmail, recipientName) => {
  try {
    // Create contact before sending email
    try {
      await createContact(recipientEmail, recipientName);
    } catch (error) {
      sendErrorLog({
        title: `Error creating contact`,
        description:
          "Email: `" + recipientEmail + "` \n Name: `" + recipientName + "`",
      });
    }

    // Send email
    let sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.templateId = 10;
    sendSmtpEmail.sender = {
      name: "Digitomize",
      email: "welcome@digitomize.com",
    };
    sendSmtpEmail.replyTo = {
      email: "support@digitomize.com",
      name: "Support",
    };

    sendSmtpEmail.messageVersions = [
      {
        to: [
          {
            email: recipientEmail,
            name: recipientName,
          },
        ],
      },
    ];

    const data = await transactionalEmailsApi.sendTransacEmail(sendSmtpEmail);
    console.log(
      "Email sent successfully. Returned data: " + JSON.stringify(data),
    );
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export { sendEmail };
