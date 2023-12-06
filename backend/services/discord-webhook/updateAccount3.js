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
  console.log("oldImage:", oldImage);
  console.log("newImage:", newImage);

  try {
    const oldEmbed = new EmbedBuilder()
      .setTitle(`Old Data - ${oldUsername}`)
      .setColor("#FF0000") // You can customize the color for the old data
      .setThumbnail(oldImage)
      .setTimestamp()
      .addFields(
        { name: "Image", value: oldImage, inline: true },
        { name: "Username", value: oldUsername, inline: true },
      )
      .setDescription(`Old Data:\n\`\`\`json\n${oldData}\n\`\`\``);

    const newEmbed = new EmbedBuilder()
      .setTitle(`New Data - ${newUsername}`)
      .setColor("#00FFFF") // You can customize the color for the new data
      .setThumbnail(newImage)
      .setTimestamp()
      .addFields(
        { name: "Image", value: newImage, inline: true },
        {
          name: "Username",
          value: `[${newUsername}](https://digitomize.com/u/${newUsername})`,
          inline: true,
        },
      )
      .setDescription(`New Data:\n\`\`\`json\n${newData}\n\`\`\``);

    webhookClient.send({
      username: "Account updated | digitomize",
      avatarURL:
        "https://res.cloudinary.com/dsazw0r59/image/upload/logo_bg_y5ixum.jpg",
      embeds: [oldEmbed, newEmbed],
    });
  } catch (error) {
    sendErrorLog("Error sending update account embed", error);
  }
}

export { sendWebhook_updateAccount };
