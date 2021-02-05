import { promises as fs } from "fs";
import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import morgan from "morgan";
import { Shl } from "./shl";

const app = express();
app.use(morgan("short"));

const indexFilePath = "public/index.html";

app.get("/", async (req, res) => {
  const app = ReactDOMServer.renderToString(<Shl message={"Hello, World!"} />);

  const indexFile = await fs.readFile(indexFilePath, {
    encoding: "utf-8",
  });

  if (!indexFile) {
    console.error("No index file");
    return res.status(500).send("Internal Server Error");
  }

  return res.send(
    indexFile.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
  );
});

app.use(express.static("./public", { maxAge: "5d" }));

export { app };
