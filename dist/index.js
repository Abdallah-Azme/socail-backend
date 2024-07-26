"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const cloudinary_1 = require("cloudinary");
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const catch_error_handler_1 = require("./middleware/catch-error-handler");
const deserialize_user_1 = require("./middleware/deserialize-user");
const not_found_route_1 = require("./middleware/not-found-route");
const pet_route_1 = require("./routes/pet.route");
const user_route_1 = require("./routes/user.route");
const body_parser_1 = __importDefault(require("body-parser"));
const gear_route_1 = require("./routes/gear.route");
const garment_route_1 = require("./routes/garment.route");
const item_route_1 = require("./routes/item.route");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
//middlewares
app.use((0, cors_1.default)({
    credentials: true,
    origin: "http://localhost:3000",
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(deserialize_user_1.deserializeUser);
// test endpoint
app.get("/health", (req, res, next) => {
    return res.send({ message: "Server is up and running" });
});
app.use("/api/v1/users", user_route_1.userRoutes);
app.use("/api/v1/pets", pet_route_1.petRoutes);
app.use("/api/v1/gears", gear_route_1.gearRoutes);
app.use("/api/v1/garments", garment_route_1.garmentRoutes);
app.use("/api/v1/items", item_route_1.itemRoutes);
app.all("*", not_found_route_1.notFoundHandler);
app.use(catch_error_handler_1.catchErrorHandler);
app.listen(process.env.PORT, () => {
    console.log("listening on port " + process.env.PORT);
});
