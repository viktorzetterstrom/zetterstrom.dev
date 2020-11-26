import React, { useEffect, useState } from 'react';
import shlService from '../../shl-service';
import TeamLogo from '../TeamLogo';
import TableContainer from '../TableContainer';
import Spinner from '../Spinner';

const WinstreaksTableHead = () => (
  <thead>
    <tr>
      <th></th>
      <th>Team</th>
      <th>Home</th>
      <th>Away</th>
      <th>Both</th>
    </tr>
  </thead>
);

const WinstreaksTableRow = ({ team }) => (
  <tr>
    <td>
      <TeamLogo id={team.id} name={team.name} />
    </td>
    <td>{team.name}</td>
    <td>{team.streaks.home}</td>
    <td>{team.streaks.away}</td>
    <td>{team.streaks.both}</td>
  </tr>
);

const WinstreaksTable = ({ winstreaks, theme }) => (
  <TableContainer {...theme}>
    <WinstreaksTableHead />
    <tbody>
      {winstreaks.map((team, i) => (
        <WinstreaksTableRow key={i} team={team} theme={theme} />
      ))}
    </tbody>
  </TableContainer>
);

export default ({ theme }) => {
  const [winstreaks, setWinstreaks] = useState({ loading: true });
  useEffect(() => {
    shlService
      .winstreaks()
      .then(res => setWinstreaks(res.data))
      .catch(err => console.error(`Error fetching games: ${err}`));
  }, []);

  return !winstreaks.loading ? (
    <WinstreaksTable winstreaks={winstreaks} theme={theme} />
  ) : (
    <Spinner theme={theme} />
  );
};
