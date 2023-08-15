// Console stuff that looks nice
console.clear();
console.log('Starting Trigam Botnet...');

// Depends
require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');
// Config stuff
const clients = require('./config/clients.js');
const configs = require('./config/bots.js');

// Turn clients and configs into arrays
const botClients = Object.values(clients);
const botConfigs = Object.values(configs);

// Iterate through each bot client
for (i = 0; i < botClients.length; i++) {
    let bot = botClients[i];
    let botConfig = botConfigs[i];

    // Add data to be used later
    bot.Discord = Discord;
    bot.commands = new Discord.Collection();
    bot.config = botConfig;
    bot.cwd = require('process').cwd;
    bot.token = botConfig.token;

    // Handlers
    for (const handler of fs.readdirSync('./handlers')) {
        require(`./handlers/${handler}`)(bot, Discord);
    }

    // Log in
    bot.login(bot.token);
}