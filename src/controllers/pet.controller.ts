import { Request } from "express";
import { CreatePetSchema } from "../schemas/pet.schema";
import { createPet, getAllPets, getPetById } from "../services/pet.service";
import { asyncHandler } from "../utils/async-handler";
import { uploadImages } from "../utils/upload-photo";

export const createPetHandler = asyncHandler(
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
    res.status(201).json({
      status: "success",
      message: "Created pet successfully",
      data: newPet,
    });
  }
);

export const getAllPetsHandler = asyncHandler(async (req, res, next) => {
  const cursor =
    req.query.cursor === "undefined" ? undefined : (req.query.cursor as string);
  const limit = 2;
  //@ts-ignore
  const pets = await getAllPets({ limit, cursor });
  const nextCursor = pets.length === limit ? pets[limit - 1].id : null;
  return res.status(200).json({
    status: "success",
    message: "Fetched pets successfully",
    data: pets,
    nextCursor,
  });
});

export const getPetHandler = asyncHandler(async (req, res, next) => {
  const petId = req.params.petId as string;
  const pet = await getPetById(petId);
  return res.status(200).json({
    status: "success",
    message: "Fetched pet successfully",
    data: pet,
  });
});
