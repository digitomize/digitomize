// webhookUtils.js
import { EmbedBuilder, WebhookClient } from "discord.js";
import dotenv from "dotenv";
import { sendErrorLog } from "./error.js";

dotenv.config();

function sendWebhook_updateAccount({
  oldImage,
  newImage,
  oldUsername,
  newUsername,
  oldData,
  newData,
}) {
  const webhookClient = new WebhookClient({ url: process.env.DC_WH_UPDATE });

  try {
    // Create embeds for old data
    const oldEmbeds = createEmbeds("Old Data", oldUsername, oldImage, oldData);

    // Create embeds for new data
    const newEmbeds = createEmbeds("New Data", newUsername, newImage, newData);

    // Send old and new embeds
    webhookClient.send({
      username: "Account updated | digitomize",
      avatarURL:
        "https://res.cloudinary.com/dsazw0r59/image/upload/logo_bg_y5ixum.jpg",
      embeds: [...oldEmbeds, ...newEmbeds],
    });
  } catch (error) {
    console.log(error);
    sendErrorLog("Error sending update account embed", error);
  }
}

function createEmbeds(titlePrefix, username, image, data) {
  const embeds = [];

  let currentEmbed = new EmbedBuilder()
    .setTitle(`${titlePrefix} - ${username}`)
    .setColor("#00FFFF") // You can customize the color
    .setThumbnail(image)
    .setTimestamp();
  console.log(typeof data);
  console.log(data?.bio?.data);
  // Add fields for old or new data here
  // Add fields for old or new data here
  currentEmbed.addFields(
    { name: "_id", value: safeString(data?._id), inline: true },
    { name: "uid", value: safeString(data?.uid), inline: true },
    {
      name: "username",
      value: `[${safeString(
        data?.username
      )}](https://digitomize.com/u/${safeString(data?.username)})`,
      inline: true,
    },
    { name: "role", value: safeString(data?.role), inline: true },
    { name: "name", value: safeString(data?.name), inline: true },
    { name: "picture", value: safeString(data?.picture), inline: true },
    { name: "resume", value: safeString(data?.resume), inline: true },
    {
      name: "email_verified",
      value: safeString(data?.email_verified),
      inline: true,
    },
    { name: "email", value: safeString(data?.email), inline: true },
    { name: "email_show", value: safeString(data?.email_show), inline: true },
    { name: "bio", value: safeString(data?.bio?.data), inline: true },
    {
      name: "dateOfBirth",
      value: safeString(data?.dateOfBirth?.data),
      inline: true,
    },
    {
      name: "phoneNumber",
      value: safeString(data?.phoneNumber?.data),
      inline: true,
    },
    {
      name: "skills",
      value: safeString(data?.skills?.join(", ")),
      inline: true,
    },
    { name: "github", value: safeString(data?.github?.data), inline: true },
    {
      name: "codechef",
      value: safeString(
        data?.codechef ? formatCodechef(data.codechef) : "Not Available"
      ),
      inline: true,
    },
    {
      name: "leetcode",
      value: safeString(
        data?.leetcode ? formatLeetCode(data.leetcode) : "Not Available"
      ),
      inline: true,
    },
    {
      name: "codeforces",
      value: safeString(
        data?.codeforces ? formatCodeforces(data.codeforces) : "Not Available"
      ),
      inline: true,
    },
    {
      name: "digitomize_rating",
      value: safeString(data?.digitomize_rating),
      inline: true,
    }
  );

  function safeString(value) {
    const stringValue = String(value);
    return stringValue.length > 0 ? stringValue : "Not Available";
  }

  // Add more fields as needed

  // Add the current embed to the array
  embeds.push(currentEmbed);

  return embeds;
}

function formatCodechef(codechefData) {
  return `${codechefData?.username} - Rating: ${
    codechefData?.rating ?? "Not Available"
  } - Badge: ${codechefData?.badge ?? "Not Available"}`;
}

function formatLeetCode(leetcodeData) {
  return `${leetcodeData?.username} - Rating: ${
    leetcodeData?.rating ?? "Not Available"
  } - Badge: ${leetcodeData?.badge ?? "Not Available"}`;
}

function formatCodeforces(codeforcesData) {
  return `${codeforcesData?.username} - Rating: ${
    codeforcesData?.rating ?? "Not Available"
  } - Badge: ${codeforcesData?.badge ?? "Not Available"}`;
}

export { sendWebhook_updateAccount };
