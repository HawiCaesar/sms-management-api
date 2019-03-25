import express from "express";
import logger from "morgan";
import bodyParser from "body-parser";
import Routes from "./routes";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", Routes);

app.get("/api", (request, response) => {
  response
    .status(200)
    .send({ message: "SMS Management application API ready" });
});

app.get("*", (request, response) => {
  response.status(404).send({ message: "Resource not found" });
});

export default app;
