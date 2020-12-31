import express from "express";
import { getRatings } from "./ratings";

const app = express();

app.get("/", async (_, res) => {
  const ratings = await getRatings();
  res.send(ratings);
});

export { app };
