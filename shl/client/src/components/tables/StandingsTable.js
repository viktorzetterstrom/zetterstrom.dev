import React, { useEffect, useState } from 'react';
import shlService from '../../shl-service';
import TeamLogo from '../TeamLogo';
import TableContainer from '../TableContainer';
import Spinner from '../Spinner';

const StandingsTableHead = () => (
  <thead>
    <tr>
      <th></th>
      <th>Team</th>
      <th>GP</th>
      <th>+/-</th>
      <th>Points</th>
    </tr>
  </thead>
);

const StandingsTableRow = ({ position }) => (
  <tr>
    <td>
      <TeamLogo id={position.team.id} name={position.team.name} />
    </td>
    <td>{position.team.name}</td>
    <td>{position.gp}</td>
    <td>{position.diff}</td>
    <td>{position.points}</td>
  </tr>
);

const StandingsTable = ({ standings, theme }) => (
  <TableContainer {...theme}>
    <StandingsTableHead />
    <tbody>
      {standings.map((position, i) => (
        <StandingsTableRow key={i} position={position} theme={theme} />
      ))}
    </tbody>
  </TableContainer>
);

export default ({ theme }) => {
  const [standings, setStandings] = useState({ loading: true });
  useEffect(() => {
    shlService
      .standings()
      .then(res => setStandings(res.data))
      .catch(err => console.error(`Error fetching games: ${err}`));
  }, []);

  return !standings.loading ? (
    <StandingsTable standings={standings} theme={theme} />
  ) : (
    <Spinner theme={theme} />
  );
};
