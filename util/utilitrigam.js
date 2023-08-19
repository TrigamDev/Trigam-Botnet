const seedrandom = require('seedrandom');

const ut = {
    //
    //  GETTERS
    //
    getName (member) {
        return member.nickname ? member.nickname : member.user.globalName;
    },

    //
    //  MANIPULATION
    //
    titleCase (str) {
        let words = str.split(' ');
        let newWords = [];
        for (let word of words) {
            let newWord = word[0].toUpperCase() + word.slice(1).toLowerCase();
            newWords.push(newWord);
        };
        return newWords.join(' ');
    },

    //
    //  GENERATION
    //
    progressBar (current, inputMax, barMax, empty, full, thumb) {
        let num = Math.round(ut.convertRange(current, [0, inputMax], [0, barMax]));
        let diff = barMax - num;
        let str = `${full.repeat(num > 0 ? num - 1 : 0)}${num === 0 ? '' : thumb}${empty.repeat(diff)}`;
        return str;
    },
    starBar (rating, maxStars, emptyStar, fullStar, halfStar) {
        let str = '';
        for (let i = 1; i <= maxStars; i++) {
            if (rating >= i) str += fullStar;
            else if (rating + 0.5 === i) str += halfStar;
            else str += emptyStar;
        };
        return str;
    },

    //
    //  CONVERSION
    //
    hexStrToNum (hex) {
        let cleaned = hex.replace(/#/g, '');
        let converted = parseInt('0x' + cleaned);
        return converted;
    },
    convertRange (value, rangeX, rangeY) {
        return ( value - rangeX[0] ) * ( rangeY[1] - rangeY[0] ) / ( rangeX[1] - rangeX[0] ) + rangeY[0];
    },

    //
    //  RANDOM
    //
    randomElem (arr, seed) {
        if (seed) return arr[Math.floor(seedrandom(seed).quick() * arr.length)];
        else return arr[Math.floor(Math.random() * arr.length)];
    },
    randomNum (min, max, seed) {
        if (seed) return Math.floor(seedrandom(seed).quick() * (max - min + 1)) + min;
        else return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    weightedRandom(items, weights, seed) {
        if (items.length !== weights.length) throw new Error('Items and weights must be of the same size');
        if (!items.length) throw new Error('Items must not be empty');

        const cumulativeWeights = [];
        for (let i = 0; i < weights.length; i += 1) cumulativeWeights[i] = weights[i] + (cumulativeWeights[i - 1] || 0);
  
        const maxCumulativeWeight = cumulativeWeights[cumulativeWeights.length - 1];
        if (seed) rand = seedrandom(seed).quick();
        else rand = Math.random();
        const randomNumber = maxCumulativeWeight * rand;

        for (let itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
            if (cumulativeWeights[itemIndex] >= randomNumber) {
                return items[itemIndex];
            }
        }
    },
};

module.exports = ut;