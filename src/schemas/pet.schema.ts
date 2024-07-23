import { Server } from "@prisma/client";
import z, { any, array, object, string, TypeOf } from "zod";
import { PetType, petTypeArray, servers } from "../constants";

const fileSchema = z.object({
  mimetype: z.enum(["image/jpeg", "image/png", "image/webp"], {
    message: "Sorry, only jpeg, png, and webp formats are acceptable",
  }),
  size: z
    .number()
    .max(1 * 1024 * 1024, { message: "Sorry, the max image size is 1MB." }),
});
const photoArraySchema = {
  files: z.array(fileSchema).refine(
    (files) => {
      return files.length <= 4;
    },
    {
      message: "You can upload a maximum of 4 photos",
    }
  ),
};

const payload = {
  body: object({
    price: string().refine((val) => Number(val), {
      message: "The price has to be a number",
    }),
    star: string().refine((val) => Number(val), {
      message: "The star has to be a number",
    }),
    title: string().max(50, "The title cannot be more than 50 characters."),
    type: string()
      .max(30, "The type cannot be more than 30 characters.")
      .refine(
        (type): type is PetType => {
          return petTypeArray.includes(type);
        },
        {
          message: "Invalid server",
        }
      ),
    server: string()
      .max(30, "Enter a vail server.")
      .refine(
        (server): server is Server => {
          return servers.includes(server);
        },
        {
          message: "Invalid server",
        }
      ),
    description: string().max(
      300,
      "The description cannot be more than 300 characters."
    ),
  }),
};

export const createPetSchema = object({
  ...payload,
  ...photoArraySchema,
});

const createPetBody = object({ ...payload });

export type CreatePetSchema = TypeOf<typeof createPetBody>;
