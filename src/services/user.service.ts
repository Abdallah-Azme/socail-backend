import { db } from "../utils/db";
import bcrypt from "bcrypt";
export const findUserByEmail = (email: string) => {
  return db.user.findUnique({
    where: { email },
  });
};

export const createNewUser = async (email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  return db.user.create({
    data: {
      email,
      password: hashedPassword,
    },
    select: {
      email: true,
    },
  });
};
