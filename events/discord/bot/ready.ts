import { Bot } from '../../../index.ts';
import pooler from '../../../util/pooler.ts';

export default {
    name: 'ready',
    run: async (bot: Bot) => {
        let loginMessage = pooler.login(bot.config.id, Date.now().toString());
        console.log(`${bot.config.consoleColor}${bot.config.name}\x1b[0m ${loginMessage.chosen}`)
    }
}