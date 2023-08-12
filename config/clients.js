const { Client, GatewayIntentBits } = require('discord.js');

module.exports = {
    Box: new Client({
        intents: [
            
        ]
    }),
    Toolbox: new Client({

    }),
    Hammer: new Client({

    }),
    Joystick: new Client({

    }),
    Radio: new Client({
        intents: [
            GatewayIntentBits.GuildVoiceStates
        ]
    }),
    Cog: new Client({

    }),
}