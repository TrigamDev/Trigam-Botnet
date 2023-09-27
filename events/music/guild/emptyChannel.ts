import { GuildQueue } from "discord-player"
import { Bot } from "../../.."

export default {
    name: 'emptyChannel',
    type: 'music',
    run: (bot: Bot, queue: GuildQueue) => {
        console.log(`[MUSIC] ${bot.config.name} left ${queue.channel.name} in ${queue.guild.name} because the channel was empty`)
    }
}