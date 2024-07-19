import { accessTokenCookieOptions } from "../controllers/user.controller";
import { asyncHandler } from "../utils/async-handler";
import { signJwt, verifyJwt } from "../utils/jwt";

export const deserializeUser = asyncHandler((req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken && !refreshToken) {
    return next();
  }

  if (accessToken) {
    const decoded = verifyJwt(accessToken);
    if (decoded) {
      //@ts-ignore
      res.locals.email = decoded.email;
      return next();
    } else {
      res.status(401).json({ status: "Fail", message: "Invalid access token" });
    }
  }
  if (!accessToken && refreshToken) {
    const decoded = verifyJwt(refreshToken);
    if (decoded) {
      //@ts-ignore
      const newAccessToken = signJwt(decoded.email, 1000 * 60 * 15);
      res.cookie("accessToken", newAccessToken, accessTokenCookieOptions);
      //@ts-ignore
      res.locals.email = decoded.email;
      return next();
    } else {
      res.status(401).json({ status: "Fail", message: "Invalid access token" });
    }
  }
  next();
});
