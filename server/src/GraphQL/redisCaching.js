const { BaseRedisCache } = require('apollo-server-cache-redis');
const Redis = require('ioredis');

const redisCaching = new BaseRedisCache({
    client: new Redis(),
})


module.exports = redisCaching;
