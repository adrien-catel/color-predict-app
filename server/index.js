import express from "express";
import React from "react";
import moment from "moment";
import { renderToNodeStream } from "react-dom/server";
import { ServerLocation } from "@reach/router";
import fs from "fs";
import dotenv from "dotenv";

import DarkSkyApi from "dark-sky-api";

import App from "../src/components/App";

const PORT = process.env.PORT || 3000;
const html = fs.readFileSync("dist/index.html").toString();
const parts = html.split("not rendered");
const app = express();

dotenv.config();
DarkSkyApi.apiKey = process.env.DARKSKY_API_KEY;
DarkSkyApi.proxy = true;

// WS
app.get("/api/darksky/loadtime/", (req, res, next) => {
  console.log("API: /api/darksky/loadtime/");
  const position = {
    latitude: req.query.latitude, 
    longitude: req.query.longitude
  };
  const time = moment(req.query.moment);
  console.log("API: Call to DarkSky");
  DarkSkyApi.loadTime(time, position)
    .then(result => {
      console.log("API: callBack");
      res.json(result);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

// APP
app.use("/dist", express.static("dist"));
app.use(("*"), (req, res) => {
  res.write(parts[0]);
  const reactMarkup = (
    <ServerLocation url={req.url}>
      <App />
    </ServerLocation>
  );

  const stream = renderToNodeStream(reactMarkup);
  stream.pipe(res, { end: false });
  stream.on("end", () => {
    res.write(parts[1]);
    res.end();
  });
});

console.log(`listening on ${PORT}`);
app.listen(PORT);