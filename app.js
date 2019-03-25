import express from "express";
import logger from "morgan";
import bodyParser from "body-parser";
import Routes from "./routes";

const app = express();
const port = process.env.PORT || 8000;

app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", Routes);

app.get("/", (request, response) => {
  response
    .status(200)
    .send({ message: "SMS Management application API ready" });
});

app.get("*", (request, response) => {
  response.status(404).send({ message: "Resource not found" });
});

app.listen(port, () => {
  console.log(`SMS API live on port ${port}`);
});

export default app;
