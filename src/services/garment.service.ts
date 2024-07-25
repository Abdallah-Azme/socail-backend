import { Gender, Server } from "@prisma/client";
import { db } from "../utils/db";

type CreateGarmentType = {
  price: number;
  title: string;
  server: Server;
  description: string;
  photo: string;
  garmentOwner: string;
  gender: Gender;
};
export const createGarment = ({
  description,
  photo: imageUrl,
  price,
  server,
  title,
  gender,
  garmentOwner,
}: CreateGarmentType) => {
  return db.garment.create({
    data: {
      description,
      price,
      server,
      title,
      gender,
      photo: imageUrl,
      garmentOwner: {
        connect: {
          id: garmentOwner,
        },
      },
    },
  });
};

export const getAllGarments = ({
  limit,
  cursor,
}: {
  limit: number;
  cursor: string | undefined;
}) => {
  return db.garment.findMany({
    take: limit,
    cursor: cursor ? { id: cursor } : undefined,
    skip: cursor ? 1 : 0,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      description: true,
      server: true,
      price: true,
      photo: true,
      gender: true,
    },
  });
};

export const getGarmentById = (id: string) => {
  return db.garment.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
      price: true,
      title: true,
      description: true,
      gender: true,
      server: true,
      status: true,
      photo: true,
      garmentOwner: {
        select: {
          id: true,
          username: true,
          characterName: true,
          server: true,
          contactInfo: true,
        },
      },
    },
  });
};
