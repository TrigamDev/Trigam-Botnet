import Discord from 'discord.js';
import { prng_alea } from 'esm-seedrandom';

//
//  DATA
//

function getNameFromMember (member: Discord.GuildMember): string {
    return member.nickname ? member.nickname : member.user.globalName;
}

function channelIsDMBased (channel: Discord.Channel): boolean {
    return false;
};



//
//  MANIPULATION
//

function clamp (num: number, min: number, max: number): number {
    return Math.min(Math.max(num, min), max);
};

function titleCase (str: string): string {
    // Important lists
    let shortPreps: string[] = ['at', 'by', 'for', 'in', 'of', 'off', 'on', 'out', 'to', 'up', 'via'];
    let lowers: string[] = ['a', 'an', 'the', 'and', 'but', 'or', 'nor', 'for', 'yet', 'so'];

    let words = str.split(' ');
    let title = '';
    for (let word of words) {
        if (word.includes('-')) {
            let hyphenated = word.split('-');
            for (let i = 0; i < hyphenated.length; i++) {
                hyphenated[i] = hyphenated[i].charAt(0).toUpperCase() + hyphenated[i].slice(1);
            }
            title += hyphenated.join('-');
        } else {
            if (shortPreps.includes(word)) title += word.toLowerCase();
            else if (lowers.includes(word)) title += word.toLowerCase();
            else title += word.charAt(0).toUpperCase() + word.slice(1);
        }
        title += ' ';
    }

    return title.trim();
};



//
//  GENERATION
//

function progressBar (current: number, inputMax: number, barMax: number, empty: string, full: string, thumb: string): string {
    let num = Math.round(convertRange(current, [0, inputMax], [0, barMax]));
    let diff = barMax - num;
    let str = `${full.repeat(num > 0 ? num - 1 : 0)}${num === 0 ? '' : thumb}${empty.repeat(diff)}`;
    return str;
};

function starBar (rating: number, maxStars: number, fullStar: string, halfStar: string, emptyStar: string): string {
    let str = '';
    for (let i = 1; i <= maxStars; i++) {
        if (rating >= i) str += fullStar;
        else if (rating + 0.5 === i) str += halfStar;
        else str += emptyStar;
    };
    return str;
};



//
//  CONVERSION
//

function convertRange (value: number, rangeX: number[], rangeY: number[]): number {
    return ( value - rangeX[0] ) * ( rangeY[1] - rangeY[0] ) / ( rangeX[1] - rangeX[0] ) + rangeY[0];
};



//
//  RANDOM
//

function randomElement (array: any[], seed: string): any {
    let rng = prng_alea(seed);
    let random = Math.floor(rng() * array.length);
    return array[random];
};

function randomNumber (min: number, max: number, seed: string): number {
    let rng = prng_alea(seed);
    return Math.floor(rng() * (max - min + 1) + min);
};



export default {
    getNameFromMember, channelIsDMBased,
    clamp, titleCase,
    progressBar, starBar,
    convertRange,
    randomElement, randomNumber
};