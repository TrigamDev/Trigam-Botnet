const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const ut = require('../../util/utilitrigam.js');
const pooler = require('../../util/pooler.js');
const emojis = require('../../config/emojis.js');

module.exports = {
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
            { name: `${emojis.rock}   Rock`, value: 'rock' },
            { name: `${emojis.paper}   Paper`, value: 'paper' },
            { name: `${emojis.scissors}   Scissors`, value: 'scissors' }
        ]
    }],

	execute: async (Discord, bot, interaction, options, subcommand) => {
        let playerChoice = options.choice;
        let botChoice = ut.randomElem(['rock', 'paper', 'scissors']);
        let result = calculateResult(playerChoice, botChoice);
        return interaction.reply({ content: `You chose:  **${formatChoice(playerChoice)}**\nI chose:  **${formatChoice(botChoice)}**.\n**${pooler.rps[result]().chosen}**`, ephemeral: true });
    }
};

function calculateResult(playerChoice, botChoice) {
    switch (playerChoice) {
        case botChoice: return rpsResult.tie;
        case 'rock': return botChoice == 'scissors' ? rpsResult.win : rpsResult.lose;
        case 'paper': return botChoice == 'rock' ? rpsResult.win : rpsResult.lose;
        case 'scissors': return botChoice == 'paper' ? rpsResult.win : rpsResult.lose;
    };
};

function formatChoice(choice) {
    switch (choice) {
        case 'rock': return `Rock  ${emojis.rock}`;
        case 'paper': return `Paper  ${emojis.paper}`;
        case 'scissors': return `Scissors  ${emojis.scissors}`;
    };
}

const rpsResult = {
    tie: 'tie',
    win: 'win',
    lose: 'lose'
};