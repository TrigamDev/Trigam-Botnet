const whitelists = require('../../../config/whitelists.js');
const errors = require('../../../config/errors.js');
const errorBuilder = require('../../../builders/error.js');

const handleServerData = require('../../../database/serverData.js');

module.exports = async function handleInteraction(Discord, bot, interaction) {

    // If the bot is on a dev build, stop non-cool people from using it
    if (bot.config.devBuild && !whitelists.users.includes(interaction.user.id))
        return await interaction.reply(errorBuilder.buildEmbedMsg(errors.noBotAccess));

    handleServerData(interaction);

    // Command handling
    if (interaction.isChatInputCommand()) {
        const command = getCommand(bot, interaction);
        if (command) return command.execute(Discord, bot, interaction, command.options, command.subcommand);
        else {
            bot.commands.delete(interaction.commandName);
            return interaction.reply(errorBuilder.buildEmbedMsg(errors.errorRunningCommand));
        };
    };
    // Autocomplete handling
    if (interaction.isAutocomplete()) {
        const command = getCommand(bot, interaction);
        if (command) return command.autocomplete(Discord, bot, interaction, command.options, command.subcommand);
    }
}

function parseOptions(hoisted) {
    var options = {};
    for (let i = 0; i < hoisted.length; i++) options[hoisted[i].name] = hoisted[i].value;
    return options;
};

function getCommand(bot, interaction) {
    let command = bot.commands.get(interaction.commandName);
    let data = {
        name: interaction.commandName,
        description: command.description,
        enabled: command.enabled,
        type: command.type,
        options: parseOptions(interaction.options._hoistedOptions),
        subcommand: interaction.options._subcommand,
        execute: command.execute,
        autocomplete: command.autocomplete
    };
    return data;
};