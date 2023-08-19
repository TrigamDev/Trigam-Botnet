const ut = require('./utilitrigam.js');

const logins = require('../pools/login.json');

const barry = require('../pools/quotes/barry.json');
const gex = require('../pools/quotes/gex.json');
const keymaster = require('../pools/quotes/keymaster.json');
const maui = require('../pools/quotes/maui.json');
const sans = require('../pools/quotes/sans.json');
const shrek = require('../pools/quotes/shrek.json');
const vector = require('../pools/quotes/vector.json');

const krabs = require('../pools/quotes/spongebob/krabs.json');

const baller = require('../pools/8ball.json');

const pooler = {
    base: (pool, seed) => {
        return {
            chosen: ut.randomElem(pool, seed),
            length: pool.length
        };
    },
    login: (id, seed) => {
        let rand = Math.floor(Math.random() * 2);
        if (!id) type = 'general';
        else type = rand === 0 ? 'general' : id;
        return pooler.base(logins[type], seed);
    },
    quotes: {
        barry: (seed) => pooler.base(barry, seed),
        gex: (seed) => pooler.base(gex, seed),
        keymaster: (seed) => pooler.base(keymaster, seed),
        krabs: (seed) => pooler.base(krabs, seed),
        maui: (seed) => pooler.base(maui, seed),
        sans: (seed) => pooler.base(sans, seed),
        shrek: (seed) => pooler.base(shrek, seed),
        vector: (seed) => pooler.base(vector, seed)
    },
    baller: {
        yes: (seed) => pooler.base(baller.responses.yes, seed),
        no: (seed) => pooler.base(baller.responses.no, seed),
        maybe: (seed) => pooler.base(baller.responses.maybe, seed),
        defer: (seed) => pooler.base(baller.responses.defer, seed),
        none: (seed) => pooler.base(baller.responses.none, seed)
    }
}

module.exports = pooler;