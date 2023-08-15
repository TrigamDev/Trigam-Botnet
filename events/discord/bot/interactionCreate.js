const whitelists = require('../../../config/whitelists.js');
const errors = require('../../../config/errors.js');
const errorBuilder = require('../../../builders/error.js');

module.exports = async function handleInteraction(Discord, bot, interaction) {
    if (bot.config.devBuild)
        return await interaction.reply(errorBuilder.buildEmbedMsg(errors.noBotAccess));

    // if (bot.config.publicRelease || (!bot.config.publicRelease && config.whitelistedUsers.includes(interaction.member.id))) {
    //     if (interaction.isCommand()) {
    //         const command = bot.commands.get(interaction.commandName);
    //         if (command) return command.execute(Discord, bot, interaction, optionsParser(interaction.options._hoistedOptions), interaction.options._subcommand);
    //         else return interaction.reply(errorBuilder(errors.errorRunningCommand)) && bot.commands.delete(interaction.commandName);
    //     }
    // } else interaction.reply(errorBuilder(errors.noBotAccess));
}