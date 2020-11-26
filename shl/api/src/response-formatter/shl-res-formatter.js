const teamNames = require('./team-names');

const standings = apiResponse =>
  apiResponse.map(position => ({
    ...position,
    team: {
      ...position.team,
      name: teamNames[position.team.id],
    },
  }));

const games = apiResponse =>
  apiResponse
    .map(game => ({
      ...game,
      start_date_time: new Date(game.start_date_time),
    }))
    .filter(game => {
      const oneWeekAway = new Date();
      oneWeekAway.setDate(oneWeekAway.getDate() + 7);
      const twoWeeksAgo = new Date();
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
      const gameDate = new Date(game.start_date_time);
      return twoWeeksAgo < gameDate && gameDate < oneWeekAway;
    });

const winstreaks = apiResponse => {
  const playedGames = apiResponse.filter(
    game => new Date() > new Date(game.start_date_time)
  );
  const teamWinstreaks = {};
  Object.entries(teamNames).forEach(([teamId, teamName]) => {
    teamWinstreaks[teamId] = {
      id: teamId,
      name: teamName,
      streaks: {
        both: 0,
        home: 0,
        away: 0,
      },
    };
  });

  const hasLostHome = {};
  const hasLostAway = {};

  playedGames.forEach(game => {
    const homeCode = game.home_team_code;
    const awayCode = game.away_team_code;
    const homeResult = game.home_team_result;
    const awayResult = game.away_team_result;

    if (homeResult > awayResult) {
      hasLostAway[awayCode] = true;

      teamWinstreaks[homeCode].streaks = {
        ...teamWinstreaks[homeCode].streaks,
        both:
          !hasLostHome[homeCode] && !hasLostAway[homeCode]
            ? (teamWinstreaks[homeCode].streaks.both += 1)
            : teamWinstreaks[homeCode].streaks.both,
        home: !hasLostHome[homeCode]
          ? (teamWinstreaks[homeCode].streaks.home += 1)
          : teamWinstreaks[homeCode].streaks.home,
      };
    } else {
      hasLostHome[homeCode] = true;

      teamWinstreaks[awayCode].streaks = {
        ...teamWinstreaks[awayCode].streaks,
        both:
          !hasLostHome[awayCode] && !hasLostAway[awayCode]
            ? (teamWinstreaks[awayCode].streaks.both += 1)
            : teamWinstreaks[awayCode].streaks.both,
        away: !hasLostAway[awayCode]
          ? (teamWinstreaks[awayCode].streaks.away += 1)
          : teamWinstreaks[awayCode].streaks.away,
      };
    }
  });
  return Object.values(teamWinstreaks)
    .sort((a, b) => b.streaks.away - a.streaks.away)
    .sort((a, b) => b.streaks.home - a.streaks.home)
    .sort((a, b) => b.streaks.both - a.streaks.both);
};

module.exports = {
  standings,
  games,
  winstreaks,
};
