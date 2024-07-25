import z, { object, TypeOf } from "zod";
import { servers } from "../constants";
import { Server } from "@prisma/client";

enum Element {
  WATER = "WATER",
  WIND = "WIND",
  EARTH = "EARTH",
  FIRE = "FIRE",
}

enum Equipment {
  NECKLACE = "NECKLACE",
  HELMET = "HELMET",
  WEAPON = "WEAPON",
  BRACELET = "BRACELET",
  BOOTS = "BOOTS",
  ARMOR = "ARMOR",
}

enum CharacterClass {
  MAGE = "MAGE",
  WARRIOR = "WARRIOR",
  NECROMANCER = "NECROMANCER",
  PALADIN = "PALADIN",
  VAMPIRE = "VAMPIRE",
  SHADOWKNIGHT = "SHADOWKNIGHT",
  SWORDMASTER = "SWORDMASTER",
  RANGER = "RANGER",
}

export const elementTypeArray: string[] = Object.values(Element);
export const equipmentTypeArray: string[] = Object.values(Equipment);
export const characterClassTypeArray: string[] = Object.values(CharacterClass);

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
    characterClass: z
      .string()
      .max(50, "The class cannot be more than 50 characters.")
      .refine(
        (characterClass) => characterClassTypeArray.includes(characterClass),
        {
          message: "Invalid server",
        }
      ),
    element: z
      .string()
      .max(20, "The element cannot be more than 50 characters.")
      .refine((element) => elementTypeArray.includes(element), {
        message: "Invalid element",
      }),
    maxElementValue: z.string().refine((val) => !isNaN(Number(val)), {
      message: "The element has to be a number",
    }),
    gearType: z
      .string()
      .max(30, "The type cannot be more than 30 characters.")
      .refine((gearType) => equipmentTypeArray.includes(gearType), {
        message: "Invalid gear type",
      }),
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
    description: z
      .string()
      .max(300, "The description cannot be more than 300 characters."),
  }),
};

export const createGearSchema = object({
  ...payload,
  ...photoArraySchema,
});

const createGearBody = object({ ...payload });

export type CreateGearSchema = TypeOf<typeof createGearBody>;
