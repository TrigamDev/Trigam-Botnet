const pooler = require('../../../util/pooler.js');

module.exports = function onReady(Discord, bot) {
    console.log(`${bot.config.consoleCol}${bot.config.name}\x1b[0m ${pooler.login(bot.config.id).chosen}`);
};