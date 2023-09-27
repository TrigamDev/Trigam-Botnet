import { GuildQueue, Track } from "discord-player"
import { Bot } from "../../.."

export default {
    name: 'audioTrackAdd',
    type: 'music',
    run: (bot: Bot, queue: GuildQueue, track: Track) => {
        console.log(`[MUSIC] ${bot.config.name} added ${track.title} to ${queue.channel.name} in ${queue.guild.name}`)
    }
}