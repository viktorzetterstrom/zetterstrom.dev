module.exports = {
  port: process.env.NODE_ENV === "development" ? 4001 : 80,
  currentSeason: 2020,
  shlId: process.env.SHL_ID,
  shlSecret: process.env.SHL_SECRET,
  cacheLifeSpan: 600,
};
