const { ApplicationCommandType } = require('discord.js');
const pooler = require('../../util/pooler.js');

module.exports = {
    name: 'champ',
    description: 'Get a randomized champ message',
    enabled: true,
    type: ApplicationCommandType.ChatInput,

	execute: async (Discord, bot, interaction, options, subcommand) => {
        return interaction.reply({ content: pooler.champ().chosen, ephemeral: true });
    }
};