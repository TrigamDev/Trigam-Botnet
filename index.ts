console.clear();
console.log("Starting Trigam Botnet...");

import * as Discord from "discord.js";
import * as fs from 'node:fs';
import { Player } from "discord-player";

import Clients from "./clients.ts";
import Configs, { BotConfig, RadioConfig } from "./config/bots.ts";

// Iterate through every bot and login
for (const [key, value] of Object.entries(Clients)) {
    // Bot data
    const client = value as Discord.Client;
    const config = Configs[key] as any;
    const bot = await applyData(client, config);
    // Load all the handlers
    for (const handler of fs.readdirSync('./handlers')) {
        import(`./handlers/${handler}`).then(handler => {
            handler.default(bot);
        }).catch(error => { console.log(error) });
    };
    // Log in
    bot.client.login(config.token);
}

async function applyData(client: Discord.Client, config: BotConfig): Promise<Bot> {
    // General bot data
    let bot = {
        client: client,
        commands: new Discord.Collection<string, any>(),
        config: config as BotConfig,
        token: config.token
    } as Bot;
    // Bot specifics
    if (config.id == RadioConfig.id) {
        const player = new Player(bot.client);
        await player.extractors.loadDefault();
        bot.player = player;
    }

    return bot;
};

export interface Bot {
    client: Discord.Client;
    commands: Discord.Collection<string, any>;
    config: BotConfig;
    token: string;
    player?: Player;
};