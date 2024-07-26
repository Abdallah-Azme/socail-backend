import cookieParser from "cookie-parser";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import { deserializeUser } from "./middleware/deserialize-user";
import { userRoutes } from "./routes/user.route";
import { petRoutes } from "./routes/pet.route";
import { gearRoutes } from "./routes/gear.route";
import { garmentRoutes } from "./routes/garment.route";
import { itemRoutes } from "./routes/item.route";
import { notFoundHandler } from "./middleware/not-found-route";
import { catchErrorHandler } from "./middleware/catch-error-handler";

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
    origin:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://e-socail-trade.vercel.app",
  })
);
app.use(cookieParser());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(deserializeUser);

// test endpoint
app.get("/health", (req, res, next) => {
  return res.send({ message: "Server is up and running" });
});
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/pets", petRoutes);
app.use("/api/v1/gears", gearRoutes);
app.use("/api/v1/garments", garmentRoutes);
app.use("/api/v1/items", itemRoutes);

app.all("*", notFoundHandler);

app.use(catchErrorHandler);

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
