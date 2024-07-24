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

// export const getAllPets = ({
//   limit,
//   cursor,
// }: {
//   limit: number;
//   cursor: string | undefined;
// }) => {
//   return db.pet.findMany({
//     take: limit,
//     cursor: cursor ? { id: cursor } : undefined,
//     skip: cursor ? 1 : 0,
//     orderBy: {
//       createAt: "desc",
//     },
//     select: {
//       id: true,
//       title: true,
//       description: true,
//       server: true,
//       price: true,
//       type: true,
//       createAt: true,
//       photos: {
//         take: 1,
//         orderBy: {
//           id: "asc",
//         },
//         select: {
//           imageUrl: true,
//         },
//       },
//     },
//   });
// };

// export const getPetById = (id: string) => {
//   return db.pet.findFirst({
//     where: {
//       id,
//     },
//     select: {
//       id: true,
//       type: true,
//       price: true,
//       title: true,
//       description: true,
//       star: true,
//       hasApproved: true,
//       server: true,
//       status: true,
//       createAt: true,
//       updatedAt: true,
//       petOwner: {
//         select: {
//           id: true,
//           username: true,
//           characterName: true,
//           server: true,
//           contactInfo: true,
//         },
//       },
//       photos: {
//         select: {
//           imageUrl: true,
//         },
//       },
//     },
//   });
// };
