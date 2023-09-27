import { GuildQueue } from "discord-player"
import { Bot } from "../../.."

export default {
    name: 'disconnect',
    type: 'music',
    run: (bot: Bot, queue: GuildQueue) => {
        console.log(`[MUSIC] ${bot.config.name} disconnected from ${queue.channel.name} in ${queue.guild.name}`)
    }
}