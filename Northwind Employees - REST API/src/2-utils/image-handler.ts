import { UploadedFile } from "express-fileupload";
import path from "path";
import { v4 as uuid } from "uuid";

// Save image to disk with UUID name:
async function saveImage(image: UploadedFile): Promise<string> {
    if(!image) return "no-image.jpg"
    const extension = image.name.substring(image.name.lastIndexOf("."));
    const fileName = uuid() + extension;
    const absolutePath = path.join(__dirname, "..", "1-assets", "images", fileName);
    await image.mv(absolutePath);
    return fileName;
}

export default {
    saveImage
};