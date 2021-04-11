import express from "express";
import morgan from "morgan";
import { HackerNews } from "./hacker-news";

const app = express();
const hn = new HackerNews();

app.set("view engine", "pug");
app.use(morgan("short"));

app.get("/", async (req, res) => {
  const stories = await hn.topStories(5);

  return res.render("index", { stories });
});

app.use(express.static("./public", { maxAge: "5d" }));

export { app };
