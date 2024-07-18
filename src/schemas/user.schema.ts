import { object, string } from "zod";

const payload = {
  body: object({
    email: string({ required_error: "Email is required" }).email(
      "It has to be a valid email."
    ),
    password: string({ required_error: "Password is required" }),
  }),
};

export const createUserSchema = object({
  ...payload,
});
