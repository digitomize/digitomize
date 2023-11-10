// webhookUtils.js
import { EmbedBuilder, WebhookClient } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();


function sendErrorLog({title, description}) {
    const webhookClient = new WebhookClient({ url: process.env.DC_WH_ERROR });
    // const headersDescription = 'Headers:\n```json\n' + JSON.stringify(req.headers, null, 2) + '```';

    const embed = new EmbedBuilder()
        .setTitle(title)
        .setColor(0x0099FF)
        .setTimestamp()
        .setDescription(description)

    webhookClient.send({
        username: 'Error logging | digitomize',
        avatarURL: "https://res.cloudinary.com/dsazw0r59/image/upload/logo_bg_y5ixum.jpg",
        embeds: [embed],
    });
}

export { sendErrorLog };
