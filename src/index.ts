import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { db } from "./utils/db";
config();

const app = express();

//middlewares
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

app.use("/api/v1", (req, res, next) => {
  console.log(req.body);
  res.json({ message: "server is up and running", data: [] });
});

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
