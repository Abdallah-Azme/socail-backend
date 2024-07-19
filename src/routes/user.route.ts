import express from "express";
import {
  userControllerLogout,
  userControllerSign,
} from "../controllers/user.controller";
import { validateSchema } from "../middleware/validate-schema";
import { createUserSchema } from "../schemas/user.schema";

const userRoutes = express.Router();

userRoutes.post("/login", validateSchema(createUserSchema), userControllerSign);
userRoutes.post("/logout", userControllerLogout);

export { userRoutes };
