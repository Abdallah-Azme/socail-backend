import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { asyncHandler } from "../utils/async-handler";

export const requiredUser = asyncHandler((req, res, next) => {
  if (res.locals.user) {
    next();
  }
  return res.json({ status: "Error", message: "You need to log in." });
});

export const requiredAdmin = asyncHandler((req, res, next) => {
  if (res.locals.user.role === "admin") {
    next();
  }
  return res.json({ status: "Error", message: "You cannot do this." });
});
