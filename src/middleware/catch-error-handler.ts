import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";

export const catchErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error);
  console.log(error.message);
  res
    .status(400)
    .json({ message: "Something went wrong, we are working on fixing it." });
};
