import React, { useEffect, useState } from 'react';
import shlService from '../../shl-service';
import TeamLogo from '../TeamLogo';
import TableContainer from '../TableContainer';
import Spinner from '../Spinner';

const GoaliesTableHead = () => (
  <thead>
    <tr>
      <th></th>
      <th>Nr</th>
      <th>Name</th>
      <th>GP</th>
      <th>GAA</th>
      <th>SVS%</th>
    </tr>
  </thead>
);

const formatGaa = gaa => gaa.toFixed(2);
const formatSvsperc = svsperc => `${svsperc.toFixed(2)}%`;

const GoaliesTableRow = ({ goalie }) => (
  <tr>
    <td>
      <TeamLogo id={goalie.info.team.id} name={goalie.info.team.name} />
    </td>
    <td>{goalie.info.number}</td>
    <td>{`${goalie.info.first_name} ${goalie.info.last_name}`}</td>
    <td>{goalie.gpi}</td>
    <td>{formatGaa(goalie.gaa)}</td>
    <td>{formatSvsperc(goalie.svsperc)}</td>
  </tr>
);

const GoaliesTable = ({ goalies, theme }) => (
  <TableContainer {...theme}>
    <GoaliesTableHead />
    <tbody>
      {goalies.map((goalie, i) => (
        <GoaliesTableRow key={i} goalie={goalie} theme={theme} />
      ))}
    </tbody>
  </TableContainer>
);

export default ({ theme }) => {
  const [goalies, setGoalies] = useState({ loading: true });
  useEffect(() => {
    shlService
      .goalies()
      .then(res => setGoalies(res.data))
      .catch(err => console.error(`Error fetching games: ${err}`));
  }, []);

  return !goalies.loading ? (
    <GoaliesTable goalies={goalies} theme={theme} />
  ) : (
    <Spinner theme={theme} />
  );
};
