import express from "express";
import { petControllerCreate } from "../controllers/pet.controller";
import { validateSchema } from "../middleware/validate-schema";
import { createPetSchema } from "../schemas/pet.schema";
import { upload } from "../utils/upload-photo";

const petRoutes = express.Router();

petRoutes.post(
  "/",
  upload.array("photos", 4),
  validateSchema(createPetSchema),
  petControllerCreate
);

export { petRoutes };
