import { GuildQueue, Track } from "discord-player";
import { Bot } from "../../..";

export default {
    name: 'playerStart',
    type: 'music',
    run: (bot: Bot, queue: GuildQueue, track: Track) => {
        console.log(`[MUSIC] ${bot.config.name} started playing ${track.title} in ${queue.channel.name} in ${queue.guild.name}`)
    }
}