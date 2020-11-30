import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";

const calculateProgress = (game) =>
  game.activeQuestion !== undefined
    ? ((game.config.amount - game.questions.length) / game.config.amount) * 100
    : 0;

const ProgressBar = ({ game }) => (
  <LinearProgress
    color="secondary"
    variant="determinate"
    value={calculateProgress(game)}
  />
);

export default ProgressBar;
