const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const errorBuilder = require('../../builders/error.js');
const errors = require('../../config/errors.js');
const ut = require('../../util/utilitrigam.js');

module.exports = {
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
        required: true
    }],

	execute: async (Discord, bot, interaction, options, subcommand) => {
        await interaction.reply({ content: 'Mimicking...', ephemeral: true });

        // Get the member
        const member = interaction.guild.members.cache.get(options.user);
        if (!member) return await interaction.reply(errorBuilder.buildEmbedMsg(errors.cantFindUser));
        
        // Get the webhook
        let webhooks = await interaction.channel.fetchWebhooks();
        let webhook = webhooks.find(wh => wh.owner.id === bot.user.id);
        if (!webhook) {
            webhook = await interaction.channel.createWebhook({
                name: bot.user.username,
                avatar: bot.user.displayAvatarURL({ dynamic: true })
            });
        };
        if (!webhook) return await interaction.reply(errorBuilder.buildEmbedMsg(errors.cantFindWebhook));

        // Send the message on the webhook
        await webhook.send({
            content: options.message,
            username: ut.getName(member),
            avatarURL: member.user.displayAvatarURL({ dynamic: true })
        });
    }
};