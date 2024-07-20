import z, { object, TypeOf } from "zod";
import { servers } from "../constants";
import { Server } from "@prisma/client";

const payload = {
  body: object({
    email: z
      .string()
      .email("Enter valid email.")
      .max(50, "Max length is 50 characters."),
    password: z
      .string()
      .min(10, "Password cannot be less than 10 characters.")
      .max(50, "Max length is 50 characters."),
    username: z
      .string()
      .min(2, "Username is required")
      .max(20, "Username cannot be more than 20 characters."),
    contactInfo: z
      .string()
      .min(2, "Contact information is required")
      .max(50, "Contact information cannot be more than 50 characters."),
    characterName: z
      .string()
      .min(2, "Character Name  is required")
      .max(30, "Character Name  cannot be more than 30 characters."),
    server: z
      .string()
      .min(2, "server is required")
      .max(30, "Enter a valid server.")
      .refine(
        (server): server is Server => {
          return servers.includes(server);
        },
        {
          message: "Invalid server",
        }
      ),
  }),
};
const payloadSignin = {
  body: object({
    email: z
      .string()
      .email("Enter valid email.")
      .max(50, "Max length is 50 characters."),
    password: z
      .string()
      .min(10, "Password cannot be less than 10 characters.")
      .max(50, "Max length is 50 characters."),
  }),
};

export const signinUserSchema = object({
  ...payloadSignin,
});
export const createUserSchema = object({
  ...payload,
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;
