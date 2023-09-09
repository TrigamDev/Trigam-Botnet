console.clear();
console.log("Starting Trigam Botnet...");

import Discord from "discord.js";
import Clients from "./clients.ts";
import Configs from "./config/bots.ts";

// Iterate through every bot and login
for (const [key, value] of Object.entries(Clients)) {
    const client = value as Discord.Client;
    const config = Configs[key] as any;
    client.login(config.token);
    console.log(`${config.consoleColor}${config.name}${"\x1b[0m"} Logging in...`);
}
