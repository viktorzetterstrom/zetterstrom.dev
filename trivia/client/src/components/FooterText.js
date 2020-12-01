import React from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.text.primary,
  },
}));

const FooterText = () => {
  const classes = useStyles();

  return (
    <Box p={1}>
      <Typography variant="subtitle2" align="center">
        <a className={classes.link} noreferrer href="https://opentdb.com/">
          Open Trivia API
        </a>
        {" | "}
        <a className={classes.link} noreferrer href="https://zetterstrom.dev/">
          zetterstrom.dev
        </a>
      </Typography>
    </Box>
  );
};

export default FooterText;
