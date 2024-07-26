import jwt from "jsonwebtoken";

const PRIVATE_KEY = process.env.PRIVATE_KEY;
if (!PRIVATE_KEY) throw new Error("Cannot access private key");
const PUBLIC_KEY = process.env.PUBLIC_KEY;
if (!PUBLIC_KEY) throw new Error("Cannot access public key");

// Sign JWT using Private key
export const signJwt = (email: string, expireTime: number) => {
  try {
    return jwt.sign({ email }, PRIVATE_KEY, {
      algorithm: "RS256",
      expiresIn: expireTime,
    });
  } catch (error) {
    console.error(error);
  }
};

// verify  JWT using public key
export const verifyJwt = (token: string) => {
  try {
    return jwt.verify(token, PUBLIC_KEY);
  } catch (error) {
    return null;
  }
};
