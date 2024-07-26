import { Request } from "express";
import { CreateGearSchema } from "../schemas/gear.schema";
import { createGear, getAllGears, getGearById } from "../services/gear.service";
import { asyncHandler } from "../utils/async-handler";
import { uploadImages } from "../utils/upload-photo";
import { CharacterClass, Element, Equipment, Server } from "@prisma/client";
import { CreateItemSchema } from "../schemas/item.schema";
import { createItem } from "../services/item.service";

export const createItemHandler = asyncHandler(
  async (req: Request<{}, {}, CreateItemSchema["body"]>, res) => {
    const { description, price, title, quantity } = req.body;

    // stupid casting
    const server = req.body.server as Server;

    //
    const userId = res.locals.user.id;

    //photo
    const files = req.files as Express.Multer.File[];
    const imagesUrl = await uploadImages(files);
    const imageUrl = imagesUrl[0];

    const newItem = await createItem({
      description,
      price: Number(price),
      title,
      server,
      itemOwner: userId,
      photo: imageUrl,
      quantity: Number(quantity),
    });
    console.log({ newItem });
    3;
    return res.status(201).json({
      status: "success",
      message: "Item created successfully",
      data: newItem,
    });
  }
);

// export const getAllGearsHandler = asyncHandler(async (req, res, next) => {
//   const cursor =
//     req.query.cursor === "undefined" ? undefined : (req.query.cursor as string);
//   console.log({ cursor });
//   const limit = 2;
//   //@ts-ignore
//   const gears = await getAllGears({ limit, cursor });
//   console.log({ gears });
//   const nextCursor = gears.length === limit ? gears[limit - 1].id : null;
//   console.log({ nextCursor });
//   return res.status(200).json({
//     status: "success",
//     message: "Fetched pets successfully",
//     data: gears,
//     nextCursor,
//   });
// });

// export const getGearHandler = asyncHandler(async (req, res, next) => {
//   const gearId = req.params.gearId as string;

//   const gear = await getGearById(gearId);

//   if (!gear) {
//     return res.status(404).json({
//       status: "fail",
//       message: "There is no gear available by this id.",
//     });
//   }
//   return res.status(200).json({
//     status: "success",
//     message: "Fetched gear successfully",
//     data: gear,
//   });
// });
