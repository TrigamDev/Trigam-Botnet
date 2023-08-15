const ut = require('./utilitrigam.js');

const logins = require('../pools/login.json');

const pooler = {
    login: (id, seed) => {
        let rand = Math.floor(Math.random() * 2);
        if (!id) type = 'general';
        else type = rand === 0 ? 'general' : id;
        return ut.randomElem(logins[type], seed)
    }
}

module.exports = pooler;