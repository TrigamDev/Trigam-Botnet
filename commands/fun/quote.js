const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const errorBuilder = require('../../builders/error.js');
const errors = require('../../config/errors.js');
const pooler = require('../../util/pooler.js');

module.exports = {
    name: 'quote',
    description: 'Quote a character',
    enabled: true,
    type: ApplicationCommandType.ChatInput,
    options: [{
        type: ApplicationCommandOptionType.String,
        name: 'character',
        description: 'The character to quote',
        required: true,
        choices: [
            { name: 'Barry B. Benson', value: 'barry' }, 
            { name: 'Gex', value: 'gex' },
            { name: 'Keymaster', value: 'keymaster' },
            { name: 'Eugene H. Krabs', value: 'krabs' },
            { name: 'Maui', value: 'maui' },
            { name: 'Sans the Skeleton', value: 'sans' },
            { name: 'Shrek', value: 'shrek' },
            { name: 'Vector', value: 'vector' }
        ]
    }],

	execute: async (Discord, bot, interaction, options, subcommand) => {
        let quote = pooler.quotes[options.character]().chosen;
        if (!quote) return await interaction.reply( errorBuilder.buildEmbedMsg(errors.cantFindCharacter, true) );
        else return await interaction.reply({ content: formatData(quote, interaction.user) })
    }
};

function formatData(quote, user) {
    quote = quote.replace(/\[USERNAME\]/g, user.globalName);
    return quote;
};