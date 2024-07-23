import express from "express";
import {
  userLogoutHandler,
  userSigninHandler,
  userSignupHandler,
} from "../controllers/user.controller";
import { validateSchema } from "../middleware/validate-schema";
import { createUserSchema, signinUserSchema } from "../schemas/user.schema";

const userRoutes = express.Router();

userRoutes
  .post("/signup", validateSchema(createUserSchema), userSignupHandler)
  .post("/signin", validateSchema(signinUserSchema), userSigninHandler);
userRoutes.post("/logout", userLogoutHandler);

export { userRoutes };
