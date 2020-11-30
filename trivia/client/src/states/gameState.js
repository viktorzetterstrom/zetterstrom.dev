const initial = {
  activeQuestion: undefined,
  questions: [],
  score: 0,
  config: {
    difficulty: "medium",
    amount: 20,
    category: 0, // id for the 'any'-category
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "answer question":
      return {
        ...state,
        score:
          action.answer === state.activeQuestion.correct
            ? state.score + 1
            : state.score,
        activeQuestion: state.questions.pop(),
        questions: state.questions,
      };

    case "set questions":
      return {
        ...state,
        score: 0,
        activeQuestion: action.questions.pop(),
        questions: action.questions,
      };

    case "difficulty":
      return {
        ...state,
        config: {
          ...state.config,
          difficulty: action.difficulty,
        },
      };

    case "amount":
      return {
        ...state,
        config: {
          ...state.config,
          amount: action.amount,
        },
      };

    case "category":
      return {
        ...state,
        config: {
          ...state.config,
          category: action.category,
        },
      };
    default:
      throw new Error("Bad action in game reducer");
  }
};

const gameState = { initial, reducer };

export default gameState;
