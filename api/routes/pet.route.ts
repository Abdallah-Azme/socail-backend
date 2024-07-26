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

const petRoutes = express.Router();

petRoutes.get("/:petId", getPetHandler);
petRoutes.get("/", getAllPetsHandler);

petRoutes.post(
  "/",
  requiredUser,
  upload.array("photos", 4),
  validateSchema(createPetSchema),
  createPetHandler
);

export { petRoutes };
