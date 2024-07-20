import bcrypt from "bcrypt";
import { db } from "../utils/db";
import { Server } from "@prisma/client";

export const findUserByEmail = (email: string) => {
  return db.user.findUnique({
    where: { email },
  });
};

type UserInput = {
  email: string;
  password: string;
  characterName: string;
  contactInfo: string;
  server: Server;
  username: string;
};

export const createNewUser = async ({
  email,
  password,
  characterName,
  contactInfo,
  server,
  username,
}: UserInput) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  return db.user.create({
    data: {
      email,
      password: hashedPassword,
      characterName,
      contactInfo,
      server,
      username,
    },
    select: {
      email: true,
      characterName: true,
      contactInfo: true,
      server: true,
      username: true,
    },
  });
};
