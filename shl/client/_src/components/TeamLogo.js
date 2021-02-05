import React from "react";

const specialWidths = { fbk: "34", dif: "25", lhc: "36", hv71: "41" };

const TeamLogo = ({ id, name }) => {
  const loweredId = id.toLowerCase();

  return (
    <img
      height="30"
      width={specialWidths[loweredId] || "30"}
      src={`/img/${loweredId}-30.png`}
      alt={`${name} logo`}
    />
  );
};

export default TeamLogo;
