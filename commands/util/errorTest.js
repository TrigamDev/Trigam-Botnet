const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const errors = require('../../config/errors.js');
const errorBuilder = require('../../builders/error.js');

module.exports = {
    name: 'errortest',
    description: 'Dev command to test how error embeds are built',
    enabled: true,
    type: ApplicationCommandType.ChatInput,
    options: [{
        type: ApplicationCommandOptionType.String,
        name: 'code',
        description: 'The code of the error to test',
        required: true,
        choices: formatErrorCodes(),
    }, {
        type: ApplicationCommandOptionType.Boolean,
        name: 'text',
        description: 'Whether to display the error message in plain text',
        required: false
    }],

	execute: async (Discord, bot, interaction, options, subcommand) => {
        let error = errorBuilder.getErrorByCode(options.code);
        if (!error) return await interaction.reply(errorBuilder.buildEmbedMsg(errors.cantGetError));
        let type = options.text ? 'text' : 'embed';
        if (type === 'text') return await interaction.reply(errorBuilder.buildMsg(error));
        else await interaction.reply(errorBuilder.buildEmbedMsg(error));
    }
};

function formatErrorCodes() {
    let output = [];
    for (let error in errors) {
        output.push({
            name: errors[error].name,
            value: errors[error].code
        });
    }
    return output;
}