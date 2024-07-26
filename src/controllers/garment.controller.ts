import { Request } from "express";
import { asyncHandler } from "../utils/async-handler";
import { CreateGarmentSchema } from "../schemas/garment.schema";
import { Gender, Server } from "@prisma/client";
import { uploadImages } from "../utils/upload-photo";
import {
  createGarment,
  getAllGarments,
  getGarmentById,
} from "../services/garment.service";

export const createGarmentHandler = asyncHandler(
  async (req: Request<{}, {}, CreateGarmentSchema["body"]>, res) => {
    const { description, price, title } = req.body;

    // stupid casting
    const server = req.body.server as Server;
    const gender = req.body.gender as Gender;

    const userId = res.locals.user.id;
    const files = req.files as Express.Multer.File[];
    const imagesUrl = await uploadImages(files);
    const imageUrl = imagesUrl[0];
    const newGarment = await createGarment({
      description,
      price: Number(price),
      title,
      server,
      garmentOwner: userId,
      photo: imageUrl,
      gender,
    });
    console.log({ newGarment });
    3;
    return res.status(201).json({
      status: "success",
      message: "Garment created successfully",
      data: newGarment,
    });
  }
);

export const getAllGarmentsHandler = asyncHandler(async (req, res, next) => {
  const cursor =
    req.query.cursor === "undefined" ? undefined : (req.query.cursor as string);
  console.log({ cursor });
  const limit = 2;
  //@ts-ignore
  const garments = await getAllGarments({ limit, cursor });
  console.log({ garments });
  const nextCursor = garments.length === limit ? garments[limit - 1].id : null;
  console.log({ nextCursor });
  return res.status(200).json({
    status: "success",
    message: "Fetched pets successfully",
    data: garments,
    nextCursor,
  });
});

export const getGarmentHandler = asyncHandler(async (req, res, next) => {
  const garmentId = req.params.garmentId as string;

  const garment = await getGarmentById(garmentId);

  if (!garment) {
    return res.status(404).json({
      status: "fail",
      message: "There is no gear available by this id.",
    });
  }
  return res.status(200).json({
    status: "success",
    message: "Fetched gear successfully",
    data: garment,
  });
});
