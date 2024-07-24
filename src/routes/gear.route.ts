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

const gearRoutes = express.Router();
gearRoutes.get("/", getAllGearsHandler);
gearRoutes.get("/:gearId", getGearHandler);

gearRoutes.post(
  "/",
  requiredUser,
  upload.array("photos", 1),
  validateSchema(createGearSchema),
  createGearHandler
);

export { gearRoutes };
