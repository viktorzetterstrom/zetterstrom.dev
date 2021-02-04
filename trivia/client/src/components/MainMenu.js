import React from "react";
import {
  Box,
  Typography,
  Button,
  ButtonGroup,
  Select,
  FormControl,
  makeStyles,
} from "@material-ui/core";

import triviaService from "../trivia-service";
import config from "../config";

const difficulties = config.difficulties;
const numberOfQuestions = config.numberOfQuestions;
const categories = config.categories;

const useStyles = makeStyles((theme) => ({
  startButton: {
    color: "rgba(0, 0, 0, 0.87)",
  },
}));

const MainMenu = ({ game, gameDispatch }) => {
  const classes = useStyles();

  const changeDifficulty = (d) =>
    gameDispatch({
      type: `difficulty`,
      difficulty: d,
    });

  const changeNumberOfQuestions = (q) =>
    gameDispatch({
      type: `amount`,
      amount: q,
    });

  const changeCategory = (c) =>
    gameDispatch({
      type: "category",
      category: c,
    });

  const startGame = async () =>
    gameDispatch({
      type: "set questions",
      questions: await triviaService.questions(game.config),
    });

  return (
    <>
      <Box m={2}>
        <Typography variant="h4" component="h1">
          Trivia Game
        </Typography>
      </Box>

      <Box m={2}>
        <Typography variant="h5" component="p">
          <label for="category-select">Category</label>
        </Typography>
        <FormControl>
          <Select
            id="category-select"
            native
            value={game.config.category}
            onChange={(e) => changeCategory(e.target.value)}
          >
            {categories.map(({ id, name }, i) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </Select>
        </FormControl>
        {game.config.category !== 0 && (
          <Typography variant="body2">
            Note that not all categories have questions of all difficulties, if
            the game does not start, try a different category.
          </Typography>
        )}
      </Box>

      <Box m={2}>
        <Typography variant="h5" component="p">
          Difficulty
        </Typography>
        <ButtonGroup
          fullWidth
          variant="contained"
          size="large"
          aria-label="full width contained primary button group"
        >
          {difficulties.map((d, i) => (
            <Button
              onClick={() => changeDifficulty(d)}
              key={i}
              color={d === game.config.difficulty ? "primary" : ""}
            >
              {d}
            </Button>
          ))}
        </ButtonGroup>
      </Box>

      <Box m={2}>
        <Typography variant="h5" component="p">
          Questions
        </Typography>
        <ButtonGroup
          fullWidth
          variant="contained"
          size="large"
          aria-label="full width contained primary button group"
        >
          {numberOfQuestions.map((q, i) => (
            <Button
              onClick={() => changeNumberOfQuestions(q)}
              key={i}
              color={q === game.config.amount ? "primary" : ""}
            >
              {q}
            </Button>
          ))}
        </ButtonGroup>
      </Box>

      <Box m={2}>
        <Button
          fullWidth
          onClick={startGame}
          variant="contained"
          color="secondary"
          size="large"
          className={classes.startButton}
        >
          Start
        </Button>
      </Box>
    </>
  );
};

export default MainMenu;
