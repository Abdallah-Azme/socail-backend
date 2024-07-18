import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { db } from "./utils/db";
import { userRoutes } from "./routes/user.route";
import { notFoundHandler } from "./middlerware/not-found-route";
import { catchErrorHandler } from "./middlerware/catch-error-handler";
config();
import cookieParser from "cookie-parser";
const app = express();

//middlewares
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());

app.use(express.json());

app.use("/api/v1/users", userRoutes);

app.all("*", notFoundHandler);

app.use(catchErrorHandler);

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
