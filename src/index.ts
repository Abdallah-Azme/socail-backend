import cookieParser from "cookie-parser";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";
import express from "express";
import { catchErrorHandler } from "./middleware/catch-error-handler";
import { deserializeUser } from "./middleware/deserialize-user";
import { notFoundHandler } from "./middleware/not-found-route";
import { petRoutes } from "./routes/pet.route";
import { userRoutes } from "./routes/user.route";
import bodyParser from "body-parser";
config();

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
//middlewares
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(deserializeUser);

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/pets", petRoutes);

app.all("*", notFoundHandler);

app.use(catchErrorHandler);

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
