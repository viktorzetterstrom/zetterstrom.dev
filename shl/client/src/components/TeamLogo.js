import React from "react";

const specialWidths = { fbk: "34", dif: "25", lhc: "36", hv71: "41" };

const TeamLogo = ({ id, name }) => (
  <img
    height="30"
    width={specialWidths[id] || "30"}
    src={`/img/${id.toLowerCase()}-30.png`}
    alt={`${name} logo`}
  />
);

export default TeamLogo;
