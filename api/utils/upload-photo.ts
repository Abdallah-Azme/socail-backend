import multer from "multer";
import cloudinary from "cloudinary";

const storage = multer.memoryStorage();

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
  },
});

export const uploadImages = async (files: Express.Multer.File[]) => {
  const uploadPromises = files.map(async (file) => {
    const base64Image = Buffer.from(file.buffer).toString("base64");
    const dataURI = `data:${file.mimetype};base64,${base64Image}`;

    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
    return uploadResponse.url;
  });

  const uploadedUrls = await Promise.all(uploadPromises);
  return uploadedUrls;
};
