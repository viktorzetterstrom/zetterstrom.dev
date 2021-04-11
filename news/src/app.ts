import express from "express";
import morgan from "morgan";

const app = express();

app.use(morgan("short"));

app.get("/", async (req, res) => {
  return res.send("news saying hello");
});

export { app };
