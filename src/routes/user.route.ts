import express from "express";
import {
  logoutUserHandler,
  signinUserHandler,
  signupUserHandler,
} from "../controllers/user.controller";
import { validateSchema } from "../middleware/validate-schema";
import { createUserSchema, signinUserSchema } from "../schemas/user.schema";

const userRoutes = express.Router();

userRoutes
  .post("/signup", validateSchema(createUserSchema), signupUserHandler)
  .post("/signin", validateSchema(signinUserSchema), signinUserHandler);
userRoutes.post("/logout", logoutUserHandler);

export { userRoutes };
