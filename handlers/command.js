var whitelists = require('../config/whitelists')
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');

module.exports = function registerCommands (bot, Discord) {
    let commands = [];
    // Go through all commands of the bot's ID and set it
    let generalCommands = addCommandDir('all');
    let botCommands = addCommandDir(bot.config.id)
    if (generalCommands.length > 0) commands = commands.concat(generalCommands);
    if (botCommands.length > 0) commands = commands.concat(botCommands);
    for (let command of commands) bot.commands.set(command.name, command);

    // When the bot starts, set all the commands
    bot.on('ready', async () => {
        if (!bot.config.devBuild) await bot.applications.commands.set(commands);
        for (const server of whitelists.servers) {
            if (bot.guilds.cache.has(server)) {
                if (whitelists.whitelist) await bot.guilds.cache.get(server).commands.set(commands);
                else await bot.guilds.cache.get(server).commands.set([]);
            }
        }
    });
}

// Go through every .js file in the given directory
// and add it to an array
function addCommandDir(dir) {
    let commands = [];
    const commandFiles = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`../commands/${dir}/${file}`);
        if (command.enabled == false) continue;
        commands.push(command);
    };
    return commands;
}