import { Request } from "express";
import { asyncHandler } from "../utils/async-handler";
import { createPet, getAllPets } from "../services/pet.service";
import { uploadImages } from "../utils/upload-photo";
import { CreatePetSchema } from "../schemas/pet.schema";

export const petCreateHandler = asyncHandler(
  async (req: Request<{}, {}, CreatePetSchema["body"]>, res) => {
    const { price, star, title, server, description, type } = req.body;
    const userId = res.locals.user.id;
    const files = req.files as Express.Multer.File[];
    const imagesUrl = await uploadImages(files);

    const newPet = await createPet({
      description,
      price: Number(price),
      star: Number(star),
      title,
      server,
      petOwner: userId,
      imagesUrl,
      type,
    });
    console.log(newPet);
    res.status(201).json({
      status: "success",
      message: "Created pet successfully",
      data: newPet,
    });
  }
);

export const petFetcherHandler = asyncHandler(async (req, res, next) => {
  const cursor = req.query.cursor as string | undefined;
  const limit = 10;
  const pets = await getAllPets({ limit, cursor });

  const nextCursor = pets.length === limit ? pets[limit - 1].id : null;
  return res.status(200).json({
    status: "success",
    message: "Fetched pets successfully",
    data: pets,
    nextCursor,
  });
});
