import z, { object, TypeOf } from "zod";
import { servers } from "../constants";
import { Server } from "@prisma/client";

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
    quantity: z.string().refine((val) => !isNaN(Number(val)), {
      message: "The quantity has to be a number",
    }),
    title: z.string().max(50, "The title cannot be more than 50 characters."),
    server: z.string().refine(
      (server): server is Server => {
        return servers.includes(server);
      },
      {
        message: "Invalid server",
      }
    ),
    description: z
      .string()
      .max(300, "The description cannot be more than 300 characters."),
  }),
};

export const createItemSchema = object({
  ...payload,
  ...photoArraySchema,
});

const createItemBody = object({ ...payload });

export type CreateItemSchema = TypeOf<typeof createItemBody>;
