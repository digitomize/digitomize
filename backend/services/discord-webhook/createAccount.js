// webhookUtils.js
import { EmbedBuilder, WebhookClient } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const webhookClient = new WebhookClient({ url: process.env.DC_WH_CREATE });

function sendWebhook_createAccount({ imageURL, title, description, content = null, username }) {
    console.log('imageURL:', imageURL);
    console.log('title:', title);
    console.log('description:', description);

    const embed = new EmbedBuilder()
        .setTitle(title)
        .setURL(`${process.env.FRONTEND_URL}/u/${username}`)
        .setThumbnail(imageURL)
        .setDescription(description)
        .setColor('#00FFFF')
        // .setFooter({ text: 'Last updated' })
        .setTimestamp();

    webhookClient.send({
        content: "[ <@&1172606485671461014> ] \n" + content,
        username: 'Account created | digitomize',
        avatarURL: imageURL,
        embeds: [embed],
    });
}

export { sendWebhook_createAccount };
