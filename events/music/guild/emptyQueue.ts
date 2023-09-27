export default {
    name: 'emptyQueue',
    type: 'music',
    run: (bot, queue) => {
        console.log(`[MUSIC] ${bot.config.name} stopped playing in ${queue.channel.name} in ${queue.guild.name} because the queue was empty`);
    }
}