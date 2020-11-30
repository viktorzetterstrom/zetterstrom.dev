const qs = require("querystring");

const apiUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001"
    : "https://trivia.zetterstrom.dev/api";

const triviaService = {
  questions: (config) =>
    fetch(`${apiUrl}/questions/?${qs.encode(config)}`).then((res) =>
      res.json()
    ),
};

export default triviaService;
