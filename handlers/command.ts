import * as Discord from "discord.js";
import { REST, Routes } from "discord.js";
import * as fs from "node:fs";

import { Bot } from "../index";
import { botGuilds } from "../config/whitelists";
import { Command } from "../events/discord/bot/interactionCreate";

export default function registerCommands(bot: Bot) {
    let commands: Command[] = [];

    // Go through all the commands
    let generalCommands: Command[] = addCommandDir('all');
    let botCommands: Command[] = addCommandDir(bot.config.id);

    // Add all the commands to the array and set them
    commands = commands.concat(generalCommands).concat(botCommands);
    for (const command of commands) bot.commands.set(command.name, command);

    // When the bot starts, set all the commands
    bot.client.on('ready', async () => {
        await bot.client.application.commands.set(commands as Discord.ApplicationCommandDataResolvable[]); 
        // Set commands on whitelisted guilds in a dev build
        for (const server of botGuilds.guilds) {
            await bot.client.guilds.fetch(server).then(async guild => {
                if (!botGuilds.enabled) return await guild.commands.set([]);
                return await guild.commands.set(commands as Discord.ApplicationCommandDataResolvable[]);
            }).catch(err => { console.error(err) });
        }
    });
};

// Go through every .js file in the given directory
// and add it to an array
function addCommandDir(dir: string) {
    let commands: Command[] = [];
    const commandFiles = fs.readdirSync(`./commands/${dir}/`)?.filter(file => file.endsWith('.ts'));
    for (const file of commandFiles) {
        const command: Command = require(`../commands/${dir}/${file}`).default;
        if (command.enabled == false) continue;
        commands.push(command);
    };
    return commands;
}