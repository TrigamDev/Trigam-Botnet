import * as fs from 'node:fs';

import { Bot } from '../index.ts';

export interface Event {
    name: string;
    type: string;
    run: Function;
};

export default function loadEvents(bot: Bot) {
    // Load all events
    for (const eventType of fs.readdirSync('./events')) {
        for (const events of fs.readdirSync(`./events/${eventType}`)) {
            loadDirectory(bot, events, eventType);
        }
    };
};

import { PlayerEvents } from 'discord-player';

function registerEvent(bot: Bot, event: Event) {
    // Register the event
    switch (event.type) {
        case 'discord':
            bot.client.on(event.name, event.run.bind(null, bot));
            break;
        case 'music':
            bot.player?.on(event.name as keyof PlayerEvents, event.run.bind(null, bot));
            break;
    };
};

// Load all events in the directory
function loadDirectory(bot: Bot, events: string, type: string = 'discord') {
    // Load each file in the directory
    const eventFiles = fs.readdirSync(`./events/${type}/${events}`).filter(file => file.endsWith('.ts'));
    for (const file of eventFiles) {
        import(`../events/${type}/${events}/${file}`).then(event => {
            registerEvent(bot, event.default);
        }).catch(error => { console.log(error) });
    };
};