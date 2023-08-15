const { ActivityType } = require('discord.js');

module.exports = {
    // Box - Fun
    box: {
        name: 'Box',
        consoleCol: '\x1b[34m',
        id: 'fun',
        version: 'Alpha 0.0.1',
        lastUpdated: 'N/A',
        activity: {
            name: 'around with you!',
            type: ActivityType.Playing
        },
        // !!! IMPORTANT
        devBuild: true,
        token: process.env.TOKEN_BOX
    }, 
    // Toolbox - Utility
    toolbox: {
        name: 'Toolbox',
        consoleCol: '\x1b[33m',
        id: 'util',
        version: 'Alpha 0.0.1',
        lastUpdated: 'N/A',
        activity: {
            name: 'for people to help!',
            type: ActivityType.Watching
        },
        // !!! IMPORTANT
        devBuild: true,
        token: process.env.TOKEN_TOOLBOX
    }, 
    // Hammer - Moderation
    hammer: {
        name: 'Hammer',
        consoleCol: '\x1b[35m',
        id: 'moderation',
        version: 'Alpha 0.0.1',
        lastUpdated: 'N/A',
        activity: {
            name: 'for people to help!',
            type: ActivityType.Watching
        },
        // !!! IMPORTANT
        devBuild: true,
        token: process.env.TOKEN_HAMMER
    }, 
    // Joystick - Games
    joystick: {
        name: 'Joystick',
        consoleCol: '\x1b[32m',
        id: 'games',
        version: 'Alpha 0.0.1',
        lastUpdated: 'N/A',
        activity: {
            name: 'games with you!',
            type: ActivityType.Playing
        },
        // !!! IMPORTANT
        devBuild: true,
        token: process.env.TOKEN_JOYSTICK
    }, 
    // Phone - Cross-server Communication
    phone: {
        name: 'Phone',
        consoleCol: '\x1b[36m',
        id: 'portal',
        version: 'Alpha 0.0.1',
        lastUpdated: 'N/A',
        activity: {
            name: 'messages to you!',
            type: ActivityType.Streaming
        },
        // !!! IMPORTANT
        devBuild: true,
        token: process.env.TOKEN_PHONE
    }, 
    // Radio - Music
    radio: {
        name: 'Radio',
        consoleCol: '\x1b[31m',
        id: 'music',
        version: 'Alpha 0.0.1',
        lastUpdated: 'N/A',
        activity: {
            name: 'to your tunes!',
            type: ActivityType.Listening
        },
        // !!! IMPORTANT
        devBuild: true,
        token: process.env.TOKEN_RADIO
    }, 
    // Cog - Custom commands
    cog: {
        name: 'Cog',
        consoleCol: '\x1b[36m',
        id: 'cc',
        version: 'Alpha 0.0.1',
        lastUpdated: 'N/A',
        activity: {
            name: 'your custom commands!',
            type: ActivityType.Playing
        },
        // !!! IMPORTANT
        devBuild: true,
        token: process.env.TOKEN_COG
    }
}