import express from "express";
import {
  createGearHandler,
  getAllGearsHandler,
  getGearHandler,
} from "../controllers/gear.controller";
import { requiredUser } from "../middleware/required-user";
import { validateSchema } from "../middleware/validate-schema";
import { createGearSchema } from "../schemas/gear.schema";
import { upload } from "../utils/upload-photo";
import { createGarmentSchema } from "../schemas/garment.schema";
import {
  createGarmentHandler,
  getAllGarmentsHandler,
  getGarmentHandler,
} from "../controllers/garment.controller";

const garmentRoutes = express.Router();
garmentRoutes.get("/", getAllGarmentsHandler);
garmentRoutes.get("/:garmentId", getGarmentHandler);

garmentRoutes.post(
  "/",
  requiredUser,
  upload.array("photos", 1),
  validateSchema(createGarmentSchema),
  createGarmentHandler
);

export { garmentRoutes };
