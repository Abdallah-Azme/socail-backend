import { Server } from "@prisma/client";
import { Request } from "express";
import { CreateItemSchema } from "../schemas/item.schema";
import { createItem, getAllItems, getItemById } from "../services/item.service";
import { asyncHandler } from "../utils/async-handler";
import { uploadImages } from "../utils/upload-photo";

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
    3;
    return res.status(201).json({
      status: "success",
      message: "Item created successfully",
      data: newItem,
    });
  }
);

export const getAllItemsHandler = asyncHandler(async (req, res, next) => {
  const cursor =
    req.query.cursor === "undefined" ? undefined : (req.query.cursor as string);
  const limit = 2;
  //@ts-ignore
  const items = await getAllItems({ limit, cursor });
  const nextCursor = items.length === limit ? items[limit - 1].id : null;
  return res.status(200).json({
    status: "success",
    message: "Fetched pets successfully",
    data: items,
    nextCursor,
  });
});

export const getItemHandler = asyncHandler(async (req, res, next) => {
  const gearId = req.params.itemId as string;

  const item = await getItemById(gearId);

  if (!item) {
    return res.status(404).json({
      status: "fail",
      message: "There is no item available by this id.",
    });
  }
  return res.status(200).json({
    status: "success",
    message: "Fetched item successfully",
    data: item,
  });
});
