import fs from "fs";
import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import morgan from "morgan";

import { Ratings } from "./components/ratings";
import { getRatings } from "./ratings";

const app = express();

app.use(morgan("short"));

app.get("/", async (req, res) => {
  const ratings = await getRatings();
  const app = ReactDOMServer.renderToString(<Ratings ratings={ratings} />);

  const indexFile = await fs.promises.readFile("public/index.html", {
    encoding: "utf-8",
  });

  if (!indexFile || !ratings) {
    console.error("No index file");
    return res.status(500).send("Oops, something went really wrong");
  }

  return res.send(
    indexFile.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
  );
});

app.use(express.static("./public", { maxAge: 1000 * 60 * 24 * 5 }));

export { app };
