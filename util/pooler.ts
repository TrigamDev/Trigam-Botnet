import ut from '../util/utilitrigam.ts';

import loginPool from '../pools/login.json';
import pings from '../pools/ping.json';
import rps from '../pools/rps.json';

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
    ping: (id: string, ms: number, seed: string) => {
        let pool: PingPool = ut.randomElement([pings.general, pings[id]], seed);
        let selectedPool = pool.general;
        // 50% chance to use the base pool
        if (Math.floor(Math.random() * 2) === 0) return pooler.base(selectedPool, seed);
        // If using latency pool, get the corresponding pool
        if (ms < 75) selectedPool = pool.low;
        else if (ms > 500) selectedPool = pool.high;
        return pooler.base(selectedPool, seed);
    },
    rps: {
        win: (seed: string) => pooler.base(rps.win, seed),
        lose: (seed: string) => pooler.base(rps.lose, seed),
        tie: (seed: string) => pooler.base(rps.tie, seed)
    },
};

interface PingPool {
    general: string[];
    low: string[];
    high: string[];
}

export default pooler;