import React, { useEffect, useState } from 'react';
import shlService from '../../shl-service';
import TeamLogo from '../TeamLogo';
import TableContainer from '../TableContainer';
import Spinner from '../Spinner';

const SkatersTableHead = () => (
  <thead>
    <tr>
      <th></th>
      <th>Nr</th>
      <th>Name</th>
      <th>GP</th>
      <th>+/-</th>
      <th>A</th>
      <th>G</th>
      <th>TP</th>
    </tr>
  </thead>
);

const SkatersTableRow = ({ skater }) => (
  <tr>
    <td>
      <TeamLogo id={skater.info.team.id} name={skater.info.team.name} />
    </td>
    <td>{skater.info.number}</td>
    <td>{`${skater.info.first_name} ${skater.info.last_name}`}</td>
    <td>{skater.gp}</td>
    <td>{skater.plus_minus}</td>
    <td>{skater.a}</td>
    <td>{skater.g}</td>
    <td>{skater.tp}</td>
  </tr>
);

const SkatersTable = ({ skaters, theme }) => (
  <TableContainer {...theme}>
    <SkatersTableHead />
    <tbody>
      {skaters.map((skater, i) => (
        <SkatersTableRow key={i} skater={skater} theme={theme} />
      ))}
    </tbody>
  </TableContainer>
);

export default ({ theme }) => {
  const [skaters, setSkaters] = useState({ loading: true });
  useEffect(() => {
    shlService
      .skaters()
      .then(res => setSkaters(res.data))
      .catch(err => console.error(`Error fetching games: ${err}`));
  }, []);

  return !skaters.loading ? (
    <SkatersTable skaters={skaters} theme={theme} />
  ) : (
    <Spinner theme={theme} />
  );
};
