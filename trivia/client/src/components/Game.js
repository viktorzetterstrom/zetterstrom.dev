import React from "react";

import Question from "./Question";

const Game = ({ game, gameDispatch }) => {
  const answerHandler = (answer) =>
    gameDispatch({
      type: "answer question",
      answer,
    });

  return (
    <Question question={game.activeQuestion} answerHandler={answerHandler} />
  );
};

export default Game;
