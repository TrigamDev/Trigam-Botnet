import { ApplicationCommandType, ChatInputCommandInteraction, ApplicationCommandOptionType } from "discord.js";

import ut from '../../util/utilitrigam.ts';
import pooler from "../../util/pooler.ts";
import { Bot } from "../../index.ts";
import emojis from '../../config/emojis.ts';

export default {
    name: 'rps',
    description: 'Play rock paper scissors with the bot',
    enabled: true,
    type: ApplicationCommandType.ChatInput,
    options: [{
        type: ApplicationCommandOptionType.String,
        name: 'choice',
        description: 'Your choice',
        required: true,
        choices: [
            { name: `${emojis.rock} Rock`, value: 'Rock' },
            { name: `${emojis.paper} Paper`, value: 'Paper' },
            { name: `${emojis.scissors} Scissors`, value: 'Scissors' }
        ]
    }],

    execute: async (bot: Bot, interaction: ChatInputCommandInteraction) => {
        // List of choices
        const choices: Choice[] = [
            { name: 'Rock', emoji: emojis.rock },
            { name: 'Paper', emoji: emojis.paper },
            { name: 'Scissors', emoji: emojis.scissors }
        ];
        // Get the choices
        let playerChoice: Choice = getChoice(interaction.options.getString('choice', true), choices);
        let botChoice: Choice = ut.randomElement(choices, interaction.id);
        // Calculate the game result
        let result: string = calculateResult(playerChoice, botChoice);
        // Respond
        return interaction.reply({
            content: `You chose:  **${playerChoice.emoji}  ${playerChoice.name}**\nI chose:  **${botChoice.emoji}  ${botChoice.name}**.\n**${pooler.rps[result]().chosen}**`,
            ephemeral: true
        });
    }
};

// Calulate the result of the game from two choices
function calculateResult(playerChoice: Choice, botChoice: Choice): string {
    let result: string = Result.tie;
    switch (playerChoice.name) {
        case botChoice.name: return Result.tie;
        case 'Rock': return botChoice.name === 'Scissors' ? Result.win : Result.lose;
        case 'Paper': return botChoice.name === 'Rock' ? Result.win : Result.lose;
        case 'Scissors': return botChoice.name === 'Paper' ? Result.win : Result.lose;
    };
    return result;
};

// Get the choice by name
function getChoice(name: String, choices: Choice[]): Choice {
    for (let i = 0; i < choices.length; i++) {
        if (choices[i].name === name) return choices[i];
    }
    return choices[0];
};

// Types
interface Choice {
    name: string;
    emoji: string;
};
const Result = {
    win: 'win',
    lose: 'lose',
    tie: 'tie'
};