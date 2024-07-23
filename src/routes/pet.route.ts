import express from "express";
import {
  petCreateHandler,
  petFetcherHandler,
} from "../controllers/pet.controller";
import { validateSchema } from "../middleware/validate-schema";
import { createPetSchema } from "../schemas/pet.schema";
import { upload } from "../utils/upload-photo";
import { requiredUser } from "../middleware/required-user";

const petRoutes = express.Router();

petRoutes
  .post(
    "/",
    requiredUser,
    upload.array("photos", 4),
    validateSchema(createPetSchema),
    petCreateHandler
  )
  .get("/", petFetcherHandler);

export { petRoutes };
