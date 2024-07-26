import { Server } from "@prisma/client";
import z, { object, TypeOf } from "zod";
import { servers } from "../constants";

enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export const genderTypeArray: string[] = Object.values(Gender);

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
      return files.length <= 1;
    },
    {
      message: "You can upload a maximum of 1 photos",
    }
  ),
};

const payload = {
  body: z.object({
    price: z.string().refine((val) => !isNaN(Number(val)), {
      message: "The price has to be a number",
    }),
    title: z.string().max(50, "The title cannot be more than 50 characters."),
    server: z
      .string()
      .max(30, "Enter a valid server.")
      .refine(
        (server): server is Server => {
          return servers.includes(server);
        },
        {
          message: "Invalid server",
        }
      ),
    gender: z
      .string()
      .max(10, "Enter a valid garment gender.")
      .refine((gender) => genderTypeArray.includes(gender), {
        message: "Invalid garment gender.",
      }),
    description: z
      .string()
      .max(300, "The description cannot be more than 300 characters."),
  }),
};

export const createGarmentSchema = object({
  ...payload,
  ...photoArraySchema,
});

const createGarmentBody = object({ ...payload });

export type CreateGarmentSchema = TypeOf<typeof createGarmentBody>;
