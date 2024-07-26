import { CharacterClass, Element, Equipment, Server } from "@prisma/client";
import { db } from "../utils/db";
import { PetType } from "../constants";

type CreateItemType = {
  price: number;
  title: string;
  server: Server;
  description: string;
  photo: string;
  itemOwner: string;
  quantity: number;
};
export const createItem = ({
  description,
  photo: imageUrl,
  price,
  server,
  title,
  itemOwner,
  quantity,
}: CreateItemType) => {
  return db.item.create({
    data: {
      description,
      price,
      server,
      title,
      quantity,
      photo: imageUrl,
      itemOwner: {
        connect: {
          id: itemOwner,
        },
      },
    },
  });
};

export const getAllItems = ({
  limit,
  cursor,
}: {
  limit: number;
  cursor: string | undefined;
}) => {
  return db.item.findMany({
    take: limit,
    cursor: cursor ? { id: cursor } : undefined,
    skip: cursor ? 1 : 0,
    orderBy: {
      cratedAt: "desc",
    },
    select: {
      id: true,
      title: true,
      description: true,
      server: true,
      price: true,
      photo: true,
      quantity: true,
    },
  });
};

// export const getGearById = (id: string) => {
//   return db.gear.findFirst({
//     where: {
//       id,
//     },
//     select: {
//       characterClass: true,
//       maxElementValue: true,
//       id: true,
//       gearType: true,
//       price: true,
//       title: true,
//       description: true,
//       element: true,
//       hasApproved: true,
//       server: true,
//       status: true,
//       createdAt: true,
//       photo: true,
//       gearOwner: {
//         select: {
//           id: true,
//           username: true,
//           characterName: true,
//           server: true,
//           contactInfo: true,
//         },
//       },
//     },
//   });
// };
