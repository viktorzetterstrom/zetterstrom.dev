import React from "react";

const TeamLogo = ({ id, name }) => (
  <img src={`/img/${id.toLowerCase()}-30.png`} alt={`${name} logo`} />
);

export default TeamLogo;
