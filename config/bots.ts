import { ActivityType } from "discord.js";

type BotConfig = {
    name: string;
    consoleColor: string;
    id: string;
    version: string;
    lastUpdated: string;
    activity: {
        name: string;
        type: ActivityType;
    };
    devBuild: boolean;
    token: string;
}

    // Box - Fun
export const BoxConfig: BotConfig = {
    name: 'Box',
    consoleColor: '\x1b[34m',
    id: 'fun',
    version: 'Alpha 0.0.1',
    lastUpdated: 'N/A',
    activity: {
        name: 'around with you!',
        type: ActivityType.Playing
    },
    // !! IMPORTANT !!
    devBuild: true,
    token: process.env.TOKEN_BOX as string
};
// Toolbox - Utility
export const ToolboxConfig: BotConfig = {
    name: 'Toolbox',
    consoleColor: '\x1b[33m',
    id: 'utility',
    version: 'Alpha 0.0.1',
    lastUpdated: 'N/A',
    activity: {
        name: 'for people to help!',
        type: ActivityType.Watching
    },
    // !! IMPORTANT !!
    devBuild: true,
    token: process.env.TOKEN_TOOLBOX as string
};
// Hammer - Moderation
export const HammerConfig: BotConfig = {
    name: 'Hammer',
    consoleColor: '\x1b[35m',
    id: 'moderation',
    version: 'Alpha 0.0.1',
    lastUpdated: 'N/A',
    activity: {
        name: 'over the server!',
        type: ActivityType.Watching
    },
    // !! IMPORTANT !!
    devBuild: true,
    token: process.env.TOKEN_HAMMER as string
};
// Joystick - Games
export const JoystickConfig: BotConfig = {
    name: 'Joystick',
    consoleColor: '\x1b[32m',
    id: 'games',
    version: 'Alpha 0.0.1',
    lastUpdated: 'N/A',
    activity: {
        name: 'games with you!',
        type: ActivityType.Playing
    },
    // !! IMPORTANT !!
    devBuild: true,
    token: process.env.TOKEN_JOYSTICK as string
};
// Phone - Cross-server Communication
export const PhoneConfig: BotConfig = {
    name: 'Phone',
    consoleColor: '\x1b[36m',
    id: 'portal',
    version: 'Alpha 0.0.1',
    lastUpdated: 'N/A',
    activity: {
        name: 'messages to you!',
        type: ActivityType.Streaming
    },
    // !! IMPORTANT !!
    devBuild: true,
    token: process.env.TOKEN_PHONE as string
};
// Radio - Music
export const RadioConfig: BotConfig = {
    name: 'Radio',
    consoleColor: '\x1b[31m',
    id: 'music',
    version: 'Alpha 0.0.1',
    lastUpdated: 'N/A',
    activity: {
        name: 'to your tunes!',
        type: ActivityType.Listening
    },
    // !! IMPORTANT !!
    devBuild: true,
    token: process.env.TOKEN_RADIO as string
};
// Cog - Custom Commands
export const CogConfig: BotConfig = {
    name: 'Cog',
    consoleColor: '\x1b[36m',
    id: 'ccs',
    version: 'Alpha 0.0.1',
    lastUpdated: 'N/A',
    activity: {
        name: 'for custom commands!',
        type: ActivityType.Watching
    },
    // !! IMPORTANT !!
    devBuild: true,
    token: process.env.TOKEN_COG as string
};

export default [ BoxConfig, ToolboxConfig, HammerConfig, JoystickConfig, PhoneConfig, RadioConfig, CogConfig ];