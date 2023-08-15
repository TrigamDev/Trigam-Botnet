const { ApplicationCommandType } = require("discord.js");
module.exports = {
    name: "ping",
    description: "Responds with the ping of the bot!",
    enabled: true,
    type: ApplicationCommandType.ChatInput,
    
	execute: async (Discord, bot, interaction, options, subcommand) => {
        await interaction.reply({ content: "Pong!" });
    }
};