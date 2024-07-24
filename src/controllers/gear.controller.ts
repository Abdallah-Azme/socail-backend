import { Request } from "express";
import { CreateGearSchema } from "../schemas/gear.schema";
import { createGear, getAllGears } from "../services/gear.service";
import { asyncHandler } from "../utils/async-handler";
import { uploadImages } from "../utils/upload-photo";
import { CharacterClass, Element, Equipment, Server } from "@prisma/client";

export const createGearHandler = asyncHandler(
  async (req: Request<{}, {}, CreateGearSchema["body"]>, res) => {
    console.log("Gear route handler got called");
    const { description, maxElementValue, price, title } = req.body;

    // stupid casting
    const server = req.body.server as Server;
    const characterClass = req.body.characterClass as CharacterClass;
    const element = req.body.element as Element;
    const gearType = req.body.gearType as Equipment;

    const userId = res.locals.user.id;
    const files = req.files as Express.Multer.File[];
    const imagesUrl = await uploadImages(files);
    const imageUrl = imagesUrl[0];
    const newGear = await createGear({
      description,
      price: Number(price),
      maxElementValue: Number(maxElementValue),
      title,
      server,
      gearOwner: userId,
      photo: imageUrl,
      characterClass,
      gearType,
      element,
    });
    console.log({ newGear });
    3;
    return res.status(201).json({
      status: "success",
      message: "Gear created successfully",
      data: newGear,
    });
  }
);

export const getAllGearsHandler = asyncHandler(async (req, res, next) => {
  const cursor =
    req.query.cursor === "undefined" ? undefined : (req.query.cursor as string);
  console.log({ cursor });
  const limit = 2;
  //@ts-ignore
  const gears = await getAllGears({ limit, cursor });
  console.log({ gears });
  const nextCursor = gears.length === limit ? gears[limit - 1].id : null;
  console.log({ nextCursor });
  return res.status(200).json({
    status: "success",
    message: "Fetched pets successfully",
    data: gears,
    nextCursor,
  });
});

// export const getPetHandler = asyncHandler(async (req, res, next) => {
//   const petId = req.params.petId as string;
//   const pet = await getPetById(petId);
//   return res.status(200).json({
//     status: "success",
//     message: "Fetched pet successfully",
//     data: pet,
//   });
// });
