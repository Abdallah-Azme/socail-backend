import express from "express";
import { config } from "dotenv";

config();

const app = express();

//middlewares
app.use(express.json());

app.use("/api/v1", (req, res, next) => {
  res.json({ message: "server is up and running", data: [] });
});

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
