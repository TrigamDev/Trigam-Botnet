import * as Discord from "discord.js";
import {
    ApplicationCommandType, ChatInputCommandInteraction, ApplicationCommandOptionType,
    User, PermissionsBitField
} from "discord.js";

import ut from "../../util/utilitrigam.ts";
import { Bot } from "../../index.ts";
import { buildErrorEmbed } from '../../util/error.ts';
import errors from '../../config/errors.ts';

export default {
    name: 'sudo',
    description: 'Mimic a user',
    enabled: true,
    type: ApplicationCommandType.ChatInput,
    options: [{
        type: ApplicationCommandOptionType.User,
        name: 'user',
        description: 'The user to mimic',
        required: true
    }, {
        type: ApplicationCommandOptionType.String,
        name: 'message',
        description: 'The message to send',
        required: true,
        length: 2000
    }],

	execute: async (bot: Bot, interaction: ChatInputCommandInteraction) => {
        // Check if not in DM
        if (!interaction.channel || interaction.channel.isDMBased())
            return await interaction.reply( buildErrorEmbed(errors.cantUseInDM) );
        // Check if bot has permissions
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageWebhooks))
            return await interaction.reply( buildErrorEmbed(errors.noWebhookPerms) );

        await interaction.reply({ content: 'Mimicking...', ephemeral: true });
        
        // Gather options
        const user: User = interaction.options.getUser('user', true);
        const message: string = interaction.options.getString('message', true);
        const channel = interaction.channel as Discord.TextChannel;

        // Get the member
        const member = interaction.guild.members.cache.get(user.id);
        if (!member) return await interaction.editReply( buildErrorEmbed(errors.cantFindUser) );
        
        // Get the webhook
        const webhooks = await channel.fetchWebhooks();
        let webhook: Discord.Webhook = webhooks.find(wh => wh.owner.id === bot.client.user.id);
        if (!webhook) {
            webhook = await channel.createWebhook({
                name: bot.client.user.username,
                avatar: bot.client.user.displayAvatarURL({ forceStatic: false })
            });
        };
        if (!webhook) return await interaction.editReply( buildErrorEmbed(errors.cantFindWebhook) );

        // Send the message on the webhook
        await webhook.send({
            content: message,
            username: ut.getNameFromMember(member),
            avatarURL: member.user.displayAvatarURL({ forceStatic: false })
        });
    }
};