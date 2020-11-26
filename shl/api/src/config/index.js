module.exports = {
  port: 4000,
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
  shlId: process.env.SHL_ID,
  shlSecret: process.env.SHL_SECRET,
  cacheLifeSpan: 600,
};
