import express from "express";
import {
  getMeHandler,
  getUserHandler,
  logoutUserHandler,
  signinUserHandler,
  signupUserHandler,
} from "../controllers/user.controller";
import { validateSchema } from "../middleware/validate-schema";
import { createUserSchema, signinUserSchema } from "../schemas/user.schema";
import { requiredUser } from "../middleware/required-user";

const userRoutes = express.Router();

userRoutes
  .post("/signup", validateSchema(createUserSchema), signupUserHandler)
  .post("/signin", validateSchema(signinUserSchema), signinUserHandler)
  .post("/logout", logoutUserHandler)
  .get("/me", requiredUser, getMeHandler)
  .get("/:userId", getUserHandler);

export { userRoutes };
