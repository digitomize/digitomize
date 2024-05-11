import brevo from "@getbrevo/brevo";
const defaultClient = brevo.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API;
const contactsApi = new brevo.ContactsApi();
const transactionalEmailsApi = new brevo.TransactionalEmailsApi();


const sendContactEmail = async (req, res) => {
  const { recipientEmail, recipientName, message } = req.body;
  try {
    // Send email
    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.sender = {
      email: recipientEmail,
      name: recipientName,
    };
    sendSmtpEmail.to = [{ "email": "support@digitomize.com", "name": "Support" }]
    sendSmtpEmail.subject = "Contact Email From " + recipientName;
    sendSmtpEmail.htmlContent = `Full Name: ${recipientName}\nEmail: ${recipientEmail}\nMessage:${message}`;

    await transactionalEmailsApi.sendTransacEmail(sendSmtpEmail);
    console.log("Contact sent successfully");
    res.status(200).json({recipientEmail});
  } catch (error) {
    console.error("Error sending contact email:", error.message);
  }
};

export { sendContactEmail };
