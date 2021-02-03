import React from "react";

const TeamLogo = ({ id, name }) => (
  <img
    width="30"
    height="30"
    src={`/img/${id.toLowerCase()}-30.png`}
    alt={`${name} logo`}
  />
);

export default TeamLogo;
