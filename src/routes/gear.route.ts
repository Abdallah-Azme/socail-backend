import express from "express";
import {
  createPetHandler,
  getAllPetsHandler,
  getPetHandler,
} from "../controllers/pet.controller";
import { requiredUser } from "../middleware/required-user";
import { validateSchema } from "../middleware/validate-schema";
import { createPetSchema } from "../schemas/pet.schema";
import { upload } from "../utils/upload-photo";
import { createGearSchema } from "../schemas/gear.schema";
import { createGearHandler } from "../controllers/gear.controller";

const gearRoutes = express.Router();

// gearRoutes.get("/:petId", getPetHandler);
// gearRoutes.get("/", getAllPetsHandler);

gearRoutes.post(
  "/",
  requiredUser,
  upload.array("photos", 1),
  validateSchema(createGearSchema),
  createGearHandler
);

export { gearRoutes };
