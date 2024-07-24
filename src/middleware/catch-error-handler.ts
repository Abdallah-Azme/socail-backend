import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import multer from "multer";

export const catchErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error);
  console.log(error.message);

  // catch multer error
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        message: "Too many files uploaded. Please upload only 1 photo.",
      });
    }
    if (error.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ message: "File too large. Maximum size is 5MB." });
    }
  }

  res
    .status(400)
    .json({ message: "Something went wrong, we are working on fixing it." });
};
