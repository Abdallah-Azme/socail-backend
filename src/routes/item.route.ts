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
import { createItemSchema } from "../schemas/item.schema";
import {
  createItemHandler,
  getAllItemsHandler,
} from "../controllers/item.controller";

const itemRoutes = express.Router();
itemRoutes.get("/", getAllItemsHandler);
// itemRoutes.get("/:itemId", getGearHandler);

itemRoutes.post(
  "/",
  requiredUser,
  upload.array("photos", 1),
  validateSchema(createItemSchema),
  createItemHandler
);

export { itemRoutes };
