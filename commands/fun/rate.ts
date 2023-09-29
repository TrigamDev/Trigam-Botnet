import { ApplicationCommandOptionType, ApplicationCommandType, ChatInputCommandInteraction } from "discord.js";

import ut from '../../util/utilitrigam.ts';
import { Bot } from '../../index.ts';
import emojis from '../../config/emojis.ts';
import rateOverrides from '../../config/overrides/rate.ts';

export default {
    name: 'rate',
    description: 'Get a rating for something',
    enabled: true,
    type: ApplicationCommandType.ChatInput,
    options: [{
        type: ApplicationCommandOptionType.String,
        name: 'thing',
        description: 'The thing to rate',
        required: true
    }, {
        type: ApplicationCommandOptionType.Integer,
        name: 'stars',
        description: 'The number of stars to rate out of',
        required: false
    }, {
        type: ApplicationCommandOptionType.Boolean,
        name: 'seeded',
        description: 'Whether to seed the rating or not',
        required: false
    }],

    execute: async (bot: Bot, interaction: ChatInputCommandInteraction) => {
        // Gather all options
        let thing: string = interaction.options.getString('thing', true);
        let stars: number = interaction.options.getInteger('stars', false) || 5;
        stars = ut.clamp(stars, 0, 50);
        let seeded: boolean = interaction.options.getBoolean('seeded', false) || false;

        // Find override
        let override: Override = getOverride(thing);

        // Get the rating
        let rating: number = 0;
        let seed = seeded ? thing : interaction.id;
        rating = ut.randomNumber(0, stars * 2, seed) / 2;
        // Override rating
        if (override) rating = ut.convertRange(override.rating, [0, 10], [0, stars * 2]);

        // Format to string
        let starStr: string = ut.starBar(rating, stars, emojis.star, emojis.halfStar, emojis.darkStar);
        let numStr = rating.toString().replace('.5', ' 1/2').replace('0 1/2', '1/2');

        // Message parts
        let starMsg = `**${numStr}** ${['1/2', '1'].includes(numStr) ? 'star' : 'stars'}`;
        let rateMsg = `I rate **${thing}** ${starMsg}!`;
        // Override message
        if (override) rateMsg = ut.randomElement(override.messages, seed);

        // Output
        return interaction.reply({ content: `${rateMsg}\n${starStr}`, ephemeral: true })
    }
};

function getOverride(alias: string): Override | null {
    let override: Override = null;
    alias = alias.toLowerCase().replace(' ', '');
    Object.keys(rateOverrides).forEach(key => {
        if (rateOverrides[key].aliases.includes(alias)) override = rateOverrides[key];
    });
    return override;
}

interface Override {
    aliases: string[];
    rating: number;
    messages: string[];
}