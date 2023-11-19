import * as Discord from 'discord.js';

import { Bot } from '../../../index.ts';
import { botUsers } from '../../../config/whitelists.ts';
import errors from '../../../config/errors.ts';
import { buildErrorEmbed } from '../../../util/error.ts';

export interface Command {
    name: string;
    description: string;
    enabled: boolean;
    type: Discord.ApplicationCommandType;
    options: object;
    subCommand: Discord.ApplicationCommandSubCommand;
    execute: Function;
    autocomplete: Function;
};

export default {
    name: 'interactionCreate',
    type: 'discord',
    run: async (bot: Bot, interaction: Discord.BaseInteraction) => {
        // Commands
        if (interaction.isCommand())
            await handleCommands(bot, interaction as Discord.ChatInputCommandInteraction);
    }
}

async function handleCommands(bot: Bot, interaction: Discord.ChatInputCommandInteraction) {
    // Check if user is whitelisted
    if (bot.config.devBuild && !botUsers.users.includes(interaction.user.id))
        return await interaction.reply( buildErrorEmbed(errors.noBotAccess) );

    // Get command
    const command = getCommand(bot, interaction);
    if (!command.enabled)
        return await interaction.reply( buildErrorEmbed(errors.commandDisabled) );

    // Execute command
    try { await command.execute(bot, interaction); }
    catch (err) {
        console.error(err);
        if (interaction.deferred || interaction.replied) await interaction.followUp( buildErrorEmbed(errors.couldntRunCommand) );
        else await interaction.reply( buildErrorEmbed(errors.couldntRunCommand) );
    }
};

function getCommand(bot: Bot, interaction: Discord.ChatInputCommandInteraction): Command {
    let command = bot.commands.get(interaction.commandName);
    let data = {
        name: interaction.commandName,
        description: command.description,
        enabled: command.enabled,
        type: command.type,
        execute: command.execute,
        autocomplete: command.autocomplete
    } as Command;
    return data;
};