import bcrypt from "bcrypt";
import { CookieOptions, Request } from "express";
import { createNewUser, findUserByEmail } from "../services/user.service";
import { asyncHandler } from "../utils/async-handler";
import { signJwt } from "../utils/jwt";
import { CreateUserInput } from "../schemas/user.schema";

export const signupUserHandler = asyncHandler(
  async (req: Request<{}, {}, CreateUserInput["body"]>, res) => {
    const { email, password, characterName, contactInfo, server, username } =
      req.body;
    const user = await findUserByEmail(email);
    if (user) {
      return res.status(409).json({
        status: "Fail",
        message: "There is an account under this email.",
      });
    }

    const newUser = await createNewUser({
      email,
      password,
      characterName,
      contactInfo,
      server,
      username,
    });

    const accessToken = signJwt(newUser.email, 15 * 1000 * 60);
    const refreshToken = signJwt(newUser.email, 1000 * 60 * 60 * 24 * 365);

    res.cookie("accessToken", accessToken, accessTokenCookieOptions);
    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

    return res.json({
      status: "Success",
      message: "Created a new user successfully.",
      data: newUser,
    });
  }
);

export const signinUserHandler = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);

  if (!user) {
    return res
      .status(400)
      .json({ status: "Fail", message: "Invalid credentials." });
  }
  try {
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (isPasswordCorrect) {
      const accessToken = signJwt(user.email, 15 * 1000 * 60);
      const refreshToken = signJwt(user.email, 1000 * 60 * 60 * 24 * 365);
      res.cookie("accessToken", accessToken, accessTokenCookieOptions);
      res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

      return res.json({
        status: "Success",
        message: "Welcome back.",
        data: { email: user.email },
      });
    } else {
      return res
        .status(400)
        .json({ status: "Fail", message: "Invalid credentials." });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ status: "Fail", message: "Invalid credentials." });
  }
});

export const logoutUserHandler = asyncHandler((req, res) => {
  res.cookie("accessToken", "", {
    maxAge: -1,
  });
  res.cookie("refreshToken", "", {
    maxAge: -1,
  });
  res.json({ status: "Success", message: "Logged out successfully" });
});

export const accessTokenCookieOptions: CookieOptions = {
  maxAge: 900000, // 15 mins
  httpOnly: true,
  domain: "localhost",
  path: "/",
  sameSite: "lax",
  secure: false,
};
export const refreshTokenCookieOptions: CookieOptions = {
  maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
  httpOnly: true,
  domain: "localhost",
  path: "/",
  sameSite: "lax",
  secure: false,
};
