import { asyncHandler } from "../utils/async-handler";

export const notFoundHandler = asyncHandler((req, res, next) => {
  res.status(400).json({ message: "This route not exist.", path: req.path });
});
