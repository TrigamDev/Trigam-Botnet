const whitelists = require('../../../config/whitelists.js');
const errors = require('../../../config/errors.js');
const errorBuilder = require('../../../builders/error.js');

module.exports = async function handleInteraction(Discord, bot, interaction) {
    // If the bot is on a dev build, stop non-cool people from using it
    if (bot.config.devBuild && !whitelists.users.includes(interaction.user.id))
        return await interaction.reply(errorBuilder.buildEmbedMsg(errors.noBotAccess));

    // Command handling
    if (interaction.isChatInputCommand()) {
        const command = bot.commands.get(interaction.commandName);
        let options = parseOptions(interaction.options._hoistedOptions);
        if (command) return command.execute(Discord, bot, interaction, options, interaction.options._subcommand);
        else {
            bot.commands.delete(interaction.commandName);
            return interaction.reply(errorBuilder.buildEmbedMsg(errors.errorRunningCommand));
        };
    };
}

function parseOptions(hoistedOptions) {
    var options = {};
    hoistedOptions.forEach(option => {
        options[option.name] = option.value;
    });
    return options;
};