import { CharacterClass, Element, Equipment, Server } from "@prisma/client";
import { db } from "../utils/db";
import { PetType } from "../constants";

type CreateGearType = {
  price: number;
  gearType: Equipment;
  title: string;
  server: Server;
  characterClass: CharacterClass;
  element: Element;
  maxElementValue: number;
  description: string;
  photo: string;
  gearOwner: string;
};
export const createGear = ({
  characterClass,
  description,
  element,
  gearType,
  maxElementValue,
  photo: imageUrl,
  price,
  server,
  title,
  gearOwner,
}: CreateGearType) => {
  return db.gear.create({
    data: {
      characterClass,
      description,
      element,
      gearType,
      maxElementValue,
      price,
      server,
      title,
      photo: imageUrl,
      gearOwner: {
        connect: {
          id: gearOwner,
        },
      },
    },
  });
};

export const getAllGears = ({
  limit,
  cursor,
}: {
  limit: number;
  cursor: string | undefined;
}) => {
  return db.gear.findMany({
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
      gearType: true,
      createdAt: true,
      photo: true,
      characterClass: true,
      element: true,
      maxElementValue: true,
    },
  });
};

export const getGearById = (id: string) => {
  return db.gear.findFirst({
    where: {
      id,
    },
    select: {
      characterClass: true,
      maxElementValue: true,
      id: true,
      gearType: true,
      price: true,
      title: true,
      description: true,
      element: true,
      hasApproved: true,
      server: true,
      status: true,
      createdAt: true,
      photo: true,
      gearOwner: {
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
