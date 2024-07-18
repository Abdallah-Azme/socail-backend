import express from "express";
import { userControllerSign } from "../controllers/user.controller";
import { validateSchema } from "../middlerware/validate-schema";
import { createUserSchema } from "../schemas/user.schema";

const userRoutes = express.Router();

userRoutes.post("/login", validateSchema(createUserSchema), userControllerSign);

export { userRoutes };
