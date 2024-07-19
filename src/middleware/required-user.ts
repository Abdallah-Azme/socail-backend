import { findUserByEmail } from "../services/user.service";
import { asyncHandler } from "../utils/async-handler";

export const requiredUser = asyncHandler(async (req, res, next) => {
  if (res.locals.email) {
    const user = await findUserByEmail(res.locals.email);
    if (user) {
      res.locals.user = user;
      return next();
    }
  }
  return res
    .status(401)
    .json({ status: "Error", message: "You need to log in." });
});

export const requiredAdmin = asyncHandler((req, res, next) => {
  if (res.locals.user.role === "ADMIN") {
    return next();
  }
  return res
    .status(403)
    .json({ status: "Error", message: "You cannot do this." });
});
