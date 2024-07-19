import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { db } from "./utils/db";
import { userRoutes } from "./routes/user.route";
import { notFoundHandler } from "./middleware/not-found-route";
import { catchErrorHandler } from "./middleware/catch-error-handler";
config();
import cookieParser from "cookie-parser";
import { deserializeUser } from "./middleware/deserialize-user";
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

app.use(deserializeUser);

app.use("/api/v1/users", userRoutes);

app.all("*", notFoundHandler);

app.use(catchErrorHandler);

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
