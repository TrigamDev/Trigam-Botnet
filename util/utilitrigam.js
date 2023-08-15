const seedrandom = require('seedrandom');

const ut = {
    //
    //  CONVERSION
    //
    hexStrToNum (hex) {
        let cleaned = hex.replace(/#/g, '');
        let converted = parseInt('0x' + cleaned);
        return converted;
    },
    //
    //  RANDOM
    //
    randomElem (arr, seed) {
        if (seed) return arr[Math.floor(seedrandom(seed).quick() * arr.length)];
        else return arr[Math.floor(Math.random() * arr.length)];
    }
};

module.exports = ut;