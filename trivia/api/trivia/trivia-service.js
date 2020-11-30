const fetch = require("node-fetch");
const qs = require("querystring");
const he = require("he");

const BASE_URL = "https://opentdb.com/api.php?";

const shuffleArray = (a) => {
  const shuffled = [...a];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const questions = async (options) => {
  const { results } = await fetch(
    `${BASE_URL}${qs.encode(options)}`
  ).then((res) => res.json());
  return results.map((q, i) => ({
    nr: i + 1,
    category: q.category,
    type: q.type,
    difficulty: q.difficulty,
    question: he.decode(q.question),
    correct: he.decode(q.correct_answer),
    alternatives: shuffleArray([
      he.decode(q.correct_answer),
      ...q.incorrect_answers.map((a) => he.decode(a)),
    ]),
  }));
};

module.exports = { questions };
