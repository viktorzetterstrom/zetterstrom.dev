const express = require("express");
const trivia = require("./trivia");

const app = express();
app.use(require("helmet")());
if (process.env.NODE_ENV === "development") app.use(require("cors")());

app.get("/", (_, res) => res.send("trivia-api"));

app.get("/questions", async ({ query }, res) => {
  const options = Object.keys(query).length > 0 ? query : { amount: 10 };
  const questions = await trivia.service.questions(options);

  res.json(questions);
});

const PORT = 5001;
app.listen(PORT, () => console.log(`trivia api listening on ${5001}`));
