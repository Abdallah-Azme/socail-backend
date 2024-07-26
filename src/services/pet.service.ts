import { Server } from "@prisma/client";
import { db } from "../utils/db";
import { PetType } from "../constants";

type CreatePetType = {
  description: string;
  price: number;
  star: number;
  title: string;
  type: PetType;
  server: Server;
  petOwner: string;
  imagesUrl: string[];
};

export const createPet = ({
  description,
  price,
  server,
  star,
  title,
  type,
  petOwner,
  imagesUrl,
}: CreatePetType) => {
  return db.pet.create({
    data: {
      description,
      price,
      server,
      star,
      title,
      type,
      petOwner: {
        connect: {
          id: petOwner,
        },
      },
      photos: {
        create: imagesUrl.map((image) => ({
          imageUrl: image,
        })),
      },
    },
  });
};

export const getAllPets = ({
  limit,
  cursor,
}: {
  limit: number;
  cursor: string | undefined;
}) => {
  return db.pet.findMany({
    take: limit,
    cursor: cursor ? { id: cursor } : undefined,
    skip: cursor ? 1 : 0,
    orderBy: {
      createAt: "desc",
    },
    select: {
      id: true,
      title: true,
      description: true,
      server: true,
      price: true,
      type: true,
      createAt: true,
      photos: {
        take: 1,
        orderBy: {
          id: "asc",
        },
        select: {
          imageUrl: true,
        },
      },
    },
  });
};

export const getPetById = (id: string) => {
  return db.pet.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      type: true,
      price: true,
      title: true,
      description: true,
      star: true,
      hasApproved: true,
      server: true,
      status: true,
      createAt: true,
      updatedAt: true,
      petOwner: {
        select: {
          id: true,
          username: true,
          characterName: true,
          server: true,
          contactInfo: true,
        },
      },
      photos: {
        select: {
          imageUrl: true,
        },
      },
    },
  });
};
