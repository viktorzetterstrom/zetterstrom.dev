import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Box, Typography } from "@material-ui/core";
import theme from "../theme";

const useStyles = makeStyles({
  answerButton: {
    width: "100%",
    marginBottom: theme.spacing(1),
  },
});

const QuestionButton = (props) => (
  <Button variant="contained" size="large" color="primary" {...props}>
    {props.text}
  </Button>
);

const Question = ({ question, answerHandler }) => {
  const classes = useStyles();
  return (
    <>
      <Box p={2}>
        <Typography variant="body1">
          {question.category} - {question.difficulty}
        </Typography>
        <Typography variant="h5" component="h2">
          {question.question}
        </Typography>
      </Box>
      <Box p={2} display="flex" flexDirection="column">
        {question.alternatives.map((alternative, i) => (
          <QuestionButton
            className={classes.answerButton}
            key={i}
            text={`${i + 1} - ${alternative}`}
            onClick={() => answerHandler(alternative)}
          />
        ))}
      </Box>
    </>
  );
};

export default Question;
