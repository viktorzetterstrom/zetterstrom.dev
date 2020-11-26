const express = require('express');
const redis = require('redis');
const formatter = require('./response-formatter/shl-res-formatter');
const config = require('./config');
const shl = require('./shl');

const redisClient = redis.createClient({
  host: config.redisHost,
  port: config.redisPort,
  retry_strategy: () => 1000,
});

const app = express();
const shlClient = shl.generateClient(config.shlId, config.shlSecret);
app.use(require('cors')());

app.get('/standings', (_, res) =>
  redisClient.get('standings', (err, standings) => {
    if (err) return res.status(500).send(err);
    if (standings)
      return res.json({ soure: 'cache', data: JSON.parse(standings) });

    return shlClient
      .season(2019)
      .statistics.teams.standings()
      .then((apiResponse) => {
        const formatedResponse = formatter.standings(apiResponse);
        redisClient.setex(
          'standings',
          config.cacheLifeSpan,
          JSON.stringify(formatedResponse)
        );
        return res.json({ source: 'api', data: formatedResponse });
      });
  })
);

app.get('/games', (_, res) =>
  redisClient.get('games', (err, games) => {
    if (err) return res.status(500).send(err);
    if (games) return res.json({ soure: 'cache', data: JSON.parse(games) });

    return shlClient
      .season(2019)
      .games()
      .then((apiResponse) => {
        const formatedResponse = formatter.games(apiResponse);
        redisClient.setex(
          'games',
          config.cacheLifeSpan,
          JSON.stringify(formatedResponse)
        );
        return res.json({ source: 'api', data: formatedResponse });
      });
  })
);

app.get('/goalies', (_, res) =>
  redisClient.get('goalies', (err, standings) => {
    if (err) return res.status(500).send(err);
    if (standings)
      return res.json({ soure: 'cache', data: JSON.parse(standings) });

    return shlClient
      .season(2019)
      .statistics.goalkeepers()
      .then((apiResponse) => {
        redisClient.setex(
          'goalies',
          config.cacheLifeSpan,
          JSON.stringify(apiResponse)
        );
        return res.json({ source: 'api', data: apiResponse });
      });
  })
);

app.get('/skaters', (_, res) =>
  redisClient.get('skaters', (err, skaters) => {
    if (err) return res.json({ error: err });
    if (skaters) res.json({ soure: 'cache', data: JSON.parse(skaters) });

    return shlClient
      .season(2019)
      .statistics.skaters()
      .then((apiResponse) => {
        redisClient.setex(
          'skaters',
          config.cacheLifeSpan,
          JSON.stringify(apiResponse)
        );
        return res.json({ source: 'api', data: apiResponse });
      });
  })
);

app.get('/winstreaks', (req, res) =>
  redisClient.get('winstreaks', (err, winstreaks) => {
    if (err) return res.status(500).send(err);
    if (winstreaks)
      return res.json({ soure: 'cache', data: JSON.parse(winstreaks) });

    return shlClient
      .season(2019)
      .games()
      .then((apiResponse) => {
        const formatedResponse = formatter.winstreaks(apiResponse);
        redisClient.setex(
          'winstreaks',
          config.cacheLifeSpan,
          JSON.stringify(formatedResponse)
        );
        return res.json({ source: 'api', data: formatedResponse });
      });
  })
);

app.listen(config.port);
