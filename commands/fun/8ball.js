const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const ut = require('../../util/utilitrigam.js');
const pooler = require('../../util/pooler.js');
const errors = require('../../config/errors.js');
const errorBuilder = require('../../builders/error.js');

module.exports = {
    name: '8ball',
    description: 'Consult the magic 8 ball to ask a question',
    enabled: true,
    type: ApplicationCommandType.ChatInput,
    options: [{
        type: ApplicationCommandOptionType.String,
        name: 'question',
        description: 'The question to ask',
        required: true
    }],

	execute: async (Discord, bot, interaction, options, subcommand) => {
        let choices = Object.keys(pooler.baller);
        let chosenPool = ut.randomElem(choices);
        
        // Get the response from the chosen pool
        let response = pooler.baller[chosenPool]().chosen;

        // Error-fakeouts
        if (errorBuilder.getErrorByValue(response)) {
            let error = errorBuilder.getErrorByValue(response);
            let msg = errorBuilder.buildEmbedMsg(error);
            msg.ephemeral = true;
            msg.embeds[0].footer = { text: 'Try again' }
            return await interaction.reply(msg);
        }

        await interaction.reply({ content: response, ephemeral: true });
    }
};