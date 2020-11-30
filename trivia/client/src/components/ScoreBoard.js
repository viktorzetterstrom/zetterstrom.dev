import React from "react";
import { Box, Typography } from "@material-ui/core";

const ScoreBoard = ({ score }) => (
  <Box m={4}>
    <Typography variant="h2" align="center">
      Score: {score}
    </Typography>
  </Box>
);

export default ScoreBoard;
