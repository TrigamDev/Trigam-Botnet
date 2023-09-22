import ut from '../util/utilitrigam.ts';
const loginPool = require('../pools/login.json');

const pooler = {
    base: (pool: any[], seed: string) => {
        return {
            chosen: ut.randomElement(pool, seed),
            length: pool.length
        }
    },
    login: (id: string, seed: string) => {
        let rand = Math.floor(Math.random() * 2);
        let type = 'general';
        if (id) type = rand === 0 ? 'general' : id;
        return pooler.base(loginPool[type], seed);
    },
};

export default pooler;