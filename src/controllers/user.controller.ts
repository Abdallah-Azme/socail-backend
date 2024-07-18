import { asyncHandler } from "../utils/async-handler";
import { createNewUser, findUserByEmail } from "../services/user.service";
import bcrypt from "bcrypt";
import { CookieOptions } from "express";
import { signJwt, verifyJwt } from "../utils/jwt";

export const userControllerSign = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);

  if (user) {
    try {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (isPasswordCorrect) {
        const accessToken = signJwt(user.email, 15 * 1000 * 60);
        const refreshToken = signJwt(user.email, 1000 * 60 * 60 * 24 * 365);
        res.cookie("access_token", accessToken, accessTokenCookieOptions);
        res.cookie("refresh_token", refreshToken, refreshTokenCookieOptions);

        return res.json({
          status: "Success",
          message: "Welcome back.",
          data: { email: user.email },
        });
      }
    } catch (error) {}
    return res
      .status(401)
      .json({ status: "Fail", message: "Invalid credentials." });
  }

  const newUser = await createNewUser(email, password);

  const accessToken = signJwt(newUser.email, 15 * 1000 * 60);
  const refreshToken = signJwt(newUser.email, 1000 * 60 * 60 * 24 * 365);

  res.cookie("access_token", accessToken, accessTokenCookieOptions);
  res.cookie("refresh_token", refreshToken, refreshTokenCookieOptions);

  return res.json({
    status: "Success",
    message: "Created a new user successfully.",
    data: newUser,
  });
});

const accessTokenCookieOptions: CookieOptions = {
  maxAge: 900000, // 15 mins
  httpOnly: true,
  domain: "localhost",
  path: "/",
  sameSite: "lax",
  secure: false,
};
const refreshTokenCookieOptions: CookieOptions = {
  maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
  httpOnly: true,
  domain: "localhost",
  path: "/",
  sameSite: "lax",
  secure: false,
};
