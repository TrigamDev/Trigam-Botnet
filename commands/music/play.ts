import * as Discord from "discord.js";
import { ApplicationCommandType, ChatInputCommandInteraction, ApplicationCommandOptionType } from "discord.js";
import { useMainPlayer } from "discord-player";

import { Bot } from "../../index.ts";
import { buildErrorEmbed } from '../../util/error.ts';
import errors from '../../config/errors.ts';

//
//  CAN'T FINISH UNTIL BUN ADDS SUPPORT FOR NODE::DGRAM
//

export default {
    name: 'play',
    description: 'Plays a song',
    enabled: true,
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'query',
            description: 'The song to play',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],

    execute: async (bot: Bot, interaction: ChatInputCommandInteraction) => {
        await interaction.deferReply();

        const player = useMainPlayer();
        const member: Discord.GuildMember = interaction.member as Discord.GuildMember;
        const me: Discord.GuildMember = await interaction.guild.members.fetch(bot.client.user?.id) as Discord.GuildMember;

        if (!member?.voice?.channel) return await interaction.followUp( buildErrorEmbed( errors.notInVc ));
        if (me?.voice?.channelId && member?.voice?.channelId != me?.voice?.channelId) return await interaction.followUp( buildErrorEmbed( errors.notSharingVc ));

        // Search for song
        const query = interaction.options.getString('query');
        
        try {
            player.play(member.voice.channel, query, {
                nodeOptions: {
                    metadata: {
                        interaction: interaction
                    }
                }
            });
            await interaction.followUp(`Playing ${query}`);
        } catch (error) {
            console.log(error);
            await interaction.followUp({ content: 'Oops lol' });
        }
    }
};