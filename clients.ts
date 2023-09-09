import { Client, GatewayIntentBits } from "discord.js";
import { BoxConfig, ToolboxConfig, HammerConfig, JoystickConfig, PhoneConfig, RadioConfig, CogConfig } from "./config/bots.ts";


export const BoxClient: Client = new Client({
    intents: [ GatewayIntentBits.Guilds ],
    presence: {
        status: BoxConfig.devBuild ? 'dnd' : 'online',
        afk: false,
        activities: [ BoxConfig.activity ]
    },
});
export const ToolboxClient: Client = new Client({
    intents: [ GatewayIntentBits.Guilds ],
    presence: {
        status: ToolboxConfig.devBuild ? 'dnd' : 'online',
        afk: false,
        activities: [ ToolboxConfig.activity ]
    }
});
export const HammerClient: Client = new Client({
    intents: [ GatewayIntentBits.Guilds ],
    presence: {
        status: HammerConfig.devBuild ? 'dnd' : 'online',
        afk: false,
        activities: [ HammerConfig.activity ]
    }
});
export const JoystickClient: Client = new Client({
    intents: [ GatewayIntentBits.Guilds ],
    presence: {
        status: JoystickConfig.devBuild ? 'dnd' : 'online',
        afk: false,
        activities: [ JoystickConfig.activity ]
    }
});
export const PhoneClient: Client = new Client({
    intents: [ GatewayIntentBits.Guilds ],
    presence: {
        status: PhoneConfig.devBuild ? 'dnd' : 'online',
        afk: false,
        activities: [ PhoneConfig.activity ]
    }
});
export const RadioClient: Client = new Client({
    intents: [ GatewayIntentBits.Guilds ],
    presence: {
        status: RadioConfig.devBuild ? 'dnd' : 'online',
        afk: false,
        activities: [ RadioConfig.activity ]
    }
});
export const CogClient: Client = new Client({
    intents: [ GatewayIntentBits.Guilds ],
    presence: {
        status: CogConfig.devBuild ? 'dnd' : 'online',
        afk: false,
        activities: [ CogConfig.activity ]
    }
});

export default [ BoxClient, ToolboxClient, HammerClient, JoystickClient, PhoneClient, RadioClient, CogClient ];