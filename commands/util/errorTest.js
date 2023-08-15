const { ApplicationCommandType } = require("discord.js");
module.exports = {
    name: "errortest",
    description: "Dev command to test how error embeds are built!",
    enabled: true,
    type: ApplicationCommandType.ChatInput,

	execute: async (Discord, bot, interaction, options, subcommand) => {
        await interaction.reply({ content: "Pong!" });
    }
};