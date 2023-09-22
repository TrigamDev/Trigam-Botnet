import * as Discord from "discord.js";
import { ApplicationCommandType, ChatInputCommandInteraction } from "discord.js";

import { Bot } from "../..";

export default {
    name: 'ping',
    description: 'Responds with the ping of the bot',
    enabled: true,
    type: ApplicationCommandType.ChatInput,

    execute: async (bot: Bot, interaction: ChatInputCommandInteraction) => {
        await interaction.reply({ content: "Pong!" });
    }
};