const { PermissionsBitField } = require('discord.js');

const perms = {
    createInvite: {
        aliases: [ 'createinvite', 'createinv', 'invite', 'inv', 'createinstantinvite', 'createinstantinv' ],
        flag: PermissionsBitField.Flags.CreateInstantInvite,
    },
    kickMembers: {
        aliases: [ 'kick', 'kickmember', 'kickmembers' ],
        flag: PermissionsBitField.Flags.KickMembers,
    },
    banMembers: {
        aliases: [ 'ban', 'banmember', 'banmembers' ],
        flag: PermissionsBitField.Flags.BanMembers,
    },
    admin: {
        aliases: [ 'admin', 'administrator', 'administrator' ],
        flag: PermissionsBitField.Flags.Administrator,
    },
    manageChannels: {
        aliases: [ 'managechannels', 'managechannel' ],
        flag: PermissionsBitField.Flags.ManageChannels,
    },
    manageGuild: {
        aliases: [ 'manageguild', 'manageserver', 'manageguilds', 'manageservers' ],
        flag: PermissionsBitField.Flags.ManageGuild,
    },
    addReactions: {
        aliases: [ 'addreactions', 'addreaction', 'react', 'reaction', 'reactions' ],
        flag: PermissionsBitField.Flags.AddReactions,
    },
    auditLog: {
        aliases: [ 'auditlog', 'auditlogs', 'viewauditlog', 'viewauditlogs', 'log', 'logs', 'viewlog', 'viewlogs' ],
        flag: PermissionsBitField.Flags.ViewAuditLog,
    },
    prioritySpeaker: {
        aliases: [ 'priorityspeaker', 'priorityspeakers', 'priorityspeak', 'priorityspeaks', 'priority' ],
        flag: PermissionsBitField.Flags.PrioritySpeaker,
    },
    stream: {
        aliases: [ 'stream', 'streams', 'livestream', 'livestreams', 'live' ],
        flag: PermissionsBitField.Flags.Stream,
    },
    viewChannel: {
        aliases: [ 'viewchannel', 'viewchannels', 'seechannel', 'seechannels' ],
        flag: PermissionsBitField.Flags.ViewChannel,
    },
    sendMessages: {
        aliases: [ 'sendmessage', 'sendmsg', 'sendmessages', 'sendmsgs', 'send', 'message', 'messages', 'msgs' ],
        flag: PermissionsBitField.Flags.SendMessages,
    },
    tts: {
        aliases: [ 'tts', 'texttospeech', 'sendtts', 'sendtexttospeech', 'ttsmessages', 'texttospeechmessages', 'sendttsmessages', 'sendtexttospeechmessages' ],
        flag: PermissionsBitField.Flags.SendTTSMessages,
    },
    manageMessages: {
        aliases: [ 'managemessages', 'managemessage', 'managemsgs', 'managemsg' ],
        flag: PermissionsBitField.Flags.ManageMessages,
    },
    embedLinks: {
        aliases: [ 'embedlinks', 'embedlink', 'links', 'link' ],
        flag: PermissionsBitField.Flags.EmbedLinks,
    },
    attachFiles: {
        aliases: [ 'attachfiles', 'attachfile', 'files', 'file', 'attachments', 'attachment' ],
        flag: PermissionsBitField.Flags.AttachFiles,
    },
    readMessageHistory: {
        aliases: [ 'readmessagehistory', 'readmsgshistory', 'readmessagehistories', 'readmsgshistories', 'readhistory', 'readhistories', 'history', 'histories', 'messagehistory', 'msgshistory', 'messagehistories', 'msgshistories' ],
        flag: PermissionsBitField.Flags.ReadMessageHistory,
    },
    mentionEveryone: {
        aliases: [ 'mentioneveryone', 'mentionall', '@everyone', 'pingeveryone', 'pingall' ],
        flag: PermissionsBitField.Flags.MentionEveryone,
    },
    externalEmojis: {
        aliases: [ 'externalemojis', 'externalemoji', 'useexternalemojis' ],
        flag: PermissionsBitField.Flags.UseExternalEmojis,
    },
    guildInsights: {
        aliases: [ 'guildinsights', 'insights', 'serverinsights', 'serverinsight', 'guildinsight', 'viewguildinsights', 'viewinsights', 'viewserverinsights', 'viewserverinsight', 'viewguildinsight' ],
        flag: PermissionsBitField.Flags.ViewGuildInsights,
    },
    voiceConnect: {
        aliases: [ 'voiceconnect', 'connectvoice', 'connecttovoice', 'connect', 'vcconnect', 'connectvc', 'connecttovc', 'joinvc', 'joinvoice', 'joinvoicechannel', 'joinvcchannel' ],
        flag: PermissionsBitField.Flags.Connect,
    },
    voiceSpeak: {
        aliases: [ 'voicespeak', 'speakvoice', 'speakinvoice', 'speak', 'vcspeak', 'speakvc', 'speakinvc' ],
        flag: PermissionsBitField.Flags.Speak,
    },
    voiceMuteMembers: {
        aliases: [ 'voicemutemembers', 'voicemutemember', 'mutemembersvoice', 'mutemembervoice', 'mutemembersinvoice', 'mutememberinvoice', 'mutemembersvc', 'mutemembervc', 'mutemembersinvc', 'mutememberinvc', 'mutemembers', 'mutemember' ],
        flag: PermissionsBitField.Flags.MuteMembers,
    },
    voiceDeafenMembers: {
        aliases: [ 'voicedeafenmembers', 'voicedeafenmember', 'deafenmembersvoice', 'deafenmembervoice', 'deafenmembersinvoice', 'deafenmemberinvoice', 'deafenmembersvc', 'deafenmembervc', 'deafenmembersinvc', 'deafenmemberinvc', 'deafenmembers', 'deafenmember' ],
        flag: PermissionsBitField.Flags.DeafenMembers,
    },
    voiceMoveMembers: {
        aliases: [ 'voicemovemembers', 'voicemovemember', 'movemembersvoice', 'movemembervoice', 'movemembersinvoice', 'movememberinvoice', 'movemembersvc', 'movemembervc', 'movemembersinvc', 'movememberinvc', 'movemembers', 'movemember' ],
        flag: PermissionsBitField.Flags.MoveMembers,
    },
    voiceUseVAD: {
        aliases: [ 'voiceusevad', 'voicevad', 'usevadvoice', 'usevadinvoice', 'usevadinvc', 'usevadvc', 'usevad' ],
        flag: PermissionsBitField.Flags.UseVAD,
    },
    changeNickname: {
        aliases: [ 'changenickname', 'changenick', 'nick', 'nickname' ],
        flag: PermissionsBitField.Flags.ChangeNickname,
    },
    manageNicknames: {
        aliases: [ 'managenicknames', 'managenicks', 'managenick', 'managenickname', 'nicknames', 'nicks' ],
        flag: PermissionsBitField.Flags.ManageNicknames,
    },
    manageRoles: {
        aliases: [ 'manageroles', 'managerole', 'roles', 'role' ],
        flag: PermissionsBitField.Flags.ManageRoles,
    },
    manageWebhooks: {
        aliases: [ 'managewebhooks', 'managewebhook', 'webhooks', 'webhook' ],
        flag: PermissionsBitField.Flags.ManageWebhooks,
    },
    manageGuildExpressions: {
        aliases: [ 'manageguildexpressions', 'guildexpressions', 'expressions', 'manageexpressions', 'manageguildexpression', 'manageexpression', 'guildexpression', 'expression' ],
        flag: PermissionsBitField.Flags.ManageGuildExpressions,
    },
    useSlashCommands: {
        aliases: [ 'useslashcommands', 'slashcommands', 'slashcommand', 'usecommands', 'usecommand', 'commands', 'command', 'useapplicationcommands', 'applicationcommands', 'applicationcommand', 'useappcommands', 'appcommands', 'appcommand' ],
        flag: PermissionsBitField.Flags.UseApplicationCommands,
    },
    requestToSpeak: {
        aliases: [ 'requesttospeak', 'requesttospeakvoice', 'requesttospeakvc', 'requesttospeakinvc', 'requesttospeakvoicechannel', 'requesttospeakvcchannel', 'requesttospeakinvcchannel' ],
        flag: PermissionsBitField.Flags.RequestToSpeak,
    },
    manageEvents: {
        aliases: [ 'manageevents', 'events', 'event', 'manageevent' ],
        flag: PermissionsBitField.Flags.ManageEvents,
    },
    manageThreads: {
        aliases: [ 'managethreads', 'threads', 'thread', 'managethread' ],
        flag: PermissionsBitField.Flags.ManageThreads,
    },
    createPublicThreads: {
        aliases: [ 'createpublicthreads', 'createpublicthread', 'publicthreads', 'publicthread' ],
        flag: PermissionsBitField.Flags.CreatePublicThreads,
    },
    createPrivateThreads: {
        aliases: [ 'createprivatethreads', 'createprivatethread', 'privatethreads', 'privatethread' ],
        flag: PermissionsBitField.Flags.CreatePrivateThreads,
    },
    useExternalStickers: {
        aliases: [ 'useexternalstickers', 'useexternalsticker', 'externalstickers', 'externalsticker' ],
        flag: PermissionsBitField.Flags.UseExternalStickers,
    },
    sendMessagesInThreads: {
        aliases: [ 'sendmessagesinthreads', 'sendinthreads' ],
        flag: PermissionsBitField.Flags.SendMessagesInThreads,
    },
    useEmbeddedActivities: {
        aliases: [ 'useembeddedactivities', 'useembeddedactivity', 'embeddedactivities', 'embeddedactivity', 'useactivites', 'useactivity', 'activities', 'activity' ],
        flag: PermissionsBitField.Flags.UseEmbeddedActivities,
    },
    moderateMembers: {
        aliases: [ 'moderatemembers', 'moderatemember', 'moderate' ],
        flag: PermissionsBitField.Flags.ModerateMembers,
    },
    viewMonetizationAnalytics: {
        aliases: [ 'viewcreatormonetizationanalytics', 'viewmonetizationanalytics', 'viewmonetization' ],
        flag: PermissionsBitField.Flags.ViewCreatorMonetizationAnalytics,
    },
    useSoundboard: {
        aliases: [ 'usesoundboard', 'soundboard', 'useboard', 'board' ],
        flag: PermissionsBitField.Flags.UseSoundboard,
    },
    useExternalSounds: {
        aliases: [ 'useexternalsounds', 'useexternalsound', 'externalsounds', 'externalsound' ],
        flag: PermissionsBitField.Flags.UseExternalSounds,
    },
    sendVoiceMessages: {
        aliases: [ 'sendvoicemessages', 'sendvoicemessage', 'voicemessages', 'voicemessage', 'sendvoicemsgs', 'sendvoicemsg', 'voicemsgs', 'voicemsg' ],
    },

    getPerm(name) {
        name = name.toLowerCase().replace(/_/g, '').replace(/-/g, '').replace(/ /g, '');
        for (let perm in perms) {
            if (perms[perm].aliases.includes(name)) return perms[perm];
        }
        return null;
    }
};

module.exports = perms;