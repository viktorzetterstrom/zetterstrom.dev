import React, { useEffect, useState } from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  score: {
    color: ({ celebrate }) =>
      celebrate ? "#00ff00" : theme.palette.text.primary,
    textShadow: ({ celebrate }) =>
      celebrate ? "0 0 2px #00ff00, 0 0 5px #00ff00" : null,
    transition: theme.transitions.create(),
  },
}));

const ScoreBoard = ({ score }) => {
  const [celebrate, setCelebrate] = useState(false);
  const classes = useStyles({ celebrate });

  useEffect(() => {
    if (score > 0) {
      setCelebrate(true);
      setTimeout(() => setCelebrate(false), 500);
    }
  }, [score]);

  return (
    <Box m={4}>
      <Typography variant="h2" align="center" className={classes.score}>
        Score: {score}
      </Typography>
    </Box>
  );
};

export default ScoreBoard;
