const { Client, GatewayIntentBits } = require('discord.js');
const { box, toolbox, hammer, joystick, phone, radio, cog } = require('./bots.js');

module.exports = {
    Box: new Client({
        intents: [
            GatewayIntentBits.Guilds
        ], 
        presence: {
            status: box.devBuild ? 'dnd' : 'online',
            afk: false,
            activities: [ box.activity ]
        }
    }),
    Toolbox: new Client({
        intents: [
            GatewayIntentBits.GuildMessageTyping
        ], 
        presence: {
            status: toolbox.devBuild ? 'dnd' : 'online',
            afk: false,
            activities: [ toolbox.activity ]
        }
    }),
    Hammer: new Client({
        intents: [
            GatewayIntentBits.GuildMessageTyping
        ], 
        presence: {
            status: hammer.devBuild ? 'dnd' : 'online',
            afk: false,
            activities: [ hammer.activity ]
        }
    }),
    Joystick: new Client({
        intents: [
            GatewayIntentBits.GuildMessageTyping
        ], 
        presence: {
            status: joystick.devBuild ? 'dnd' : 'online',
            afk: false,
            activities: [ joystick.activity ]
        }
    }),
    Phone: new Client({
        intents: [
            GatewayIntentBits.GuildMessageTyping
        ], 
        presence: {
            status: phone.devBuild ? 'dnd' : 'online',
            afk: false,
            activities: [ phone.activity ]
        }
    }),
    Radio: new Client({
        intents: [
            GatewayIntentBits.GuildMessageTyping
        ],
        presence: {
            status: radio.devBuild ? 'dnd' : 'online',
            afk: false,
            activities: [ radio.activity ]
        }
    }),
    Cog: new Client({
        intents: [
            GatewayIntentBits.GuildMessageTyping
        ], 
        presence: {
            status: cog.devBuild ? 'dnd' : 'online',
            afk: false,
            activities: [ cog.activity ]
        }
    }),
}