import { ApplicationCommandType, ChatInputCommandInteraction } from "discord.js";

import pooler from "../../util/pooler.ts";
import { Bot } from "../../index.ts";

export default {
    name: 'ping',
    description: 'Responds with the ping of the bot',
    enabled: true,
    type: ApplicationCommandType.ChatInput,

    execute: async (bot: Bot, interaction: ChatInputCommandInteraction) => {
        let latency = Date.now() - interaction.createdTimestamp;
        let response = pooler.ping(bot.config.id, latency, interaction.id);
        await interaction.reply({ content: `${response.chosen}\n\`${latency}ms\``, ephemeral: true });
    }
};