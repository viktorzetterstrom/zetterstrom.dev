import React, { useReducer } from "react";
import { CssBaseline, Container, Paper, Box } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

import theme from "../theme";
import MainMenu from "./MainMenu";
import ScoreBoard from "./ScoreBoard";
import Game from "./Game";
import ProgressBar from "./ProgressBar";

import gameState from "../states/gameState";

const App = () => {
  const [game, gameDispatch] = useReducer(gameState.reducer, gameState.initial);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box mt={4}>
        <Container maxWidth="sm">
          <Paper>
            <Box pt={2}>
              <ProgressBar game={game} />
            </Box>
            <Box p={1}>
              {game.activeQuestion !== undefined ? (
                <Game game={game} gameDispatch={gameDispatch} />
              ) : (
                <MainMenu game={game} gameDispatch={gameDispatch} />
              )}
            </Box>
          </Paper>

          <ScoreBoard score={game.score} />
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;
