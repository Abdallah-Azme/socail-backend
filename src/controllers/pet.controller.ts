import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { uploadImages } from "../utils/upload-photo";

export const petControllerCreate = async (req: Request, res: Response) => {
  try {
    console.log("files ", req.files);
    console.log("body ", req.body);
    //@ts-ignore
    const urls = await uploadImages(req.files);
    console.log("urls ", urls);

    res.json({ message: "oki" });
  } catch (error: any) {
    console.log(error);
    console.log(error.message);
    return res.json({ message: "error" });
  }
};
