import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError, ZodIssue } from "zod";

export const validateSchema =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        files: req.files,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (error: any) {
      res.status(400).json({ status: "Fail", message: formatZodErrors(error) });
    }
  };

const formatZodErrors = (error: ZodError): string => {
  return error.errors

    .map((issue: ZodIssue) => `${issue.path.at(1)}: ${issue.message}`)
    .join("; ");
};
