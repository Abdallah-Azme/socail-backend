import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError, ZodIssue } from "zod";

export const validateSchema =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (error: any) {
      res.json({ status: "Fail", message: formatZodErrors(error) });
    }
  };

const formatZodErrors = (
  error: ZodError
): { path: string; message: string }[] => {
  return error.errors.map((issue: ZodIssue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));
};
