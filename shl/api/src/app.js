const express = require("express");
const formatter = require("./response-formatter/shl-res-formatter");
const config = require("./config");
const shl = require("./shl");
const app = express();
const cache = require("./services/cache");

const shlClient = shl.generateClient(config.shlId, config.shlSecret);
app.use(require("cors")());

app.get("/standings", cache.routeCacher, (req, res) =>
  shlClient
    .season(config.currentSeason)
    .statistics.teams.standings()
    .then((apiResponse) => {
      const formattedResponse = formatter.standings(apiResponse);
      cache.addToCache(req.path, formattedResponse);
      return res.json({ source: "api", data: formattedResponse });
    })
);

app.get("/games", cache.routeCacher, (req, res) =>
  shlClient
    .season(config.currentSeason)
    .games()
    .then((apiResponse) => {
      const formattedResponse = formatter.games(apiResponse);
      cache.addToCache(req.path, formattedResponse);
      return res.json({ source: "api", data: formattedResponse });
    })
);

app.get("/goalkeepers", cache.routeCacher, (req, res) =>
  shlClient
    .season(config.currentSeason)
    .statistics.goalkeepers()
    .then((apiResponse) => {
      cache.addToCache(req.path, apiResponse);
      return res.json({ source: "api", data: apiResponse });
    })
);

app.get("/skaters", cache.routeCacher, (req, res) =>
  shlClient
    .season(config.currentSeason)
    .statistics.skaters()
    .then((apiResponse) => {
      cache.addToCache(req.path, apiResponse);
      return res.json({ source: "api", data: apiResponse });
    })
);

app.get("/winstreaks", cache.routeCacher, (req, res) =>
  shlClient
    .season(2019)
    .games()
    .then((apiResponse) => {
      const formattedResponse = formatter.winstreaks(apiResponse);
      cache.addToCache(req.path, formattedResponse);
      return res.json({ source: "api", data: formattedResponse });
    })
);

module.exports = app;
