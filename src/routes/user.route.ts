import express from "express";
import {
  userControllerLogout,
  userControllerSignin,
  userControllerSignup,
} from "../controllers/user.controller";
import { validateSchema } from "../middleware/validate-schema";
import { createUserSchema, signinUserSchema } from "../schemas/user.schema";

const userRoutes = express.Router();

userRoutes
  .post("/signup", validateSchema(createUserSchema), userControllerSignup)
  .post("/signin", validateSchema(signinUserSchema), userControllerSignin);
userRoutes.post("/logout", userControllerLogout);

export { userRoutes };
