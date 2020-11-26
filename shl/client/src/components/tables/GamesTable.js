import React, { useEffect, useState } from 'react';
import shlService from '../../shl-service';
import TeamLogo from '../TeamLogo';
import TableContainer from '../TableContainer';
import Spinner from '../Spinner';

const GamesTableHead = () => (
  <thead>
    <tr>
      <th>Date</th>
      <th>Time</th>
      <th>Home</th>
      <th>Away</th>
      <th>Result</th>
    </tr>
  </thead>
);

const formatGameDate = date => new Date(date).toLocaleDateString('sv-SE');
const formatGameTime = date =>
  new Date(date).toLocaleTimeString('sv-SE').slice(0, -3);
const displayResult = game =>
  new Date(game.start_date_time) < new Date()
    ? `${game.home_team_result} - ${game.away_team_result}`
    : '-';

const GamesTableRow = ({ game }) => (
  <tr>
    <td>{formatGameDate(game.start_date_time)}</td>
    <td>{formatGameTime(game.start_date_time)}</td>
    <td>
      <TeamLogo id={game.home_team_code} name={game.home_team_name} />
    </td>
    <td>
      <TeamLogo id={game.away_team_code} name={game.away_team_name} />{' '}
    </td>
    <td>{displayResult(game)}</td>
  </tr>
);

const GamesTable = ({ games, theme }) => (
  <TableContainer {...theme}>
    <GamesTableHead />
    <tbody>
      {games.map((game, i) => (
        <GamesTableRow key={i} game={game} theme={theme} />
      ))}
    </tbody>
  </TableContainer>
);

export default ({ theme }) => {
  const [games, setGames] = useState({ loading: true });
  useEffect(() => {
    shlService
      .games()
      .then(res => setGames(res.data))
      .catch(err => console.error(`Error fetching games: ${err}`));
  }, []);

  return !games.loading ? (
    <GamesTable games={games} theme={theme} />
  ) : (
    <Spinner theme={theme} />
  );
};
