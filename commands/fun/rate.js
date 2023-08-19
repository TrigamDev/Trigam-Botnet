const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const ut = require('../../util/utilitrigam.js');
const emojis = require('../../config/emojis.js');
const rateOverride = require('../../config/overrides/rate.js');

module.exports = {
    name: 'rate',
    description: 'Give a rating on anything',
    enabled: true,
    type: ApplicationCommandType.ChatInput,
    options: [{
        type: ApplicationCommandOptionType.String,
        name: 'thing',
        description: 'The thing to rate',
        required: true,
    }, {
        type: ApplicationCommandOptionType.Integer,
        name: 'stars',
        description: 'The maximum number of stars to rate',
        required: false
    },{
        type: ApplicationCommandOptionType.Boolean,
        name: 'seed',
        description: 'Whether or not to seed the rating',
        required: false
    }],

	execute: async (Discord, bot, interaction, options, subcommand) => {
        let thing = options.thing.toLowerCase().replace(/ /g, '_');
        let stars = options.stars || 5;
        if (stars > 50) stars = 50;

        // Get the rating
        if (options.seed) rating = ut.randomNum(0, stars * 2, options.thing);
        else rating = ut.randomNum(0, stars * 2);
        if (rateOverride[thing]?.rating !== undefined) rating = ut.convertRange(rateOverride[thing].rating, [0, 10], [0, stars * 2]);

        // Format it into a string
        let starStr = ut.starBar(rating / 2, stars, emojis.darkStar, emojis.star, emojis.halfStar)
        let numStr = (rating / 2).toString().replace('.5', ' 1/2').replace('0 1/2', '1/2');

        // Message parts
        let starMsg = `**${numStr}** ${['1/2', '1'].includes(numStr) ? 'star' : 'stars'}`;
        let rateMsg = `I rate **${options.thing}** ${starMsg}!`;
        if (rateOverride[thing]?.messages) rateMsg = ut.randomElem(rateOverride[thing].messages);

        return interaction.reply({ content: `${rateMsg}\n${starStr}` })
    }
};