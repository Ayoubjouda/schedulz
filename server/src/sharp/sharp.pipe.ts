import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import * as path from "path";

@Injectable()
export class SharpPipe implements PipeTransform<Express.Multer.File> {
  async transform(image: Express.Multer.File) {
    // const originalName = path.parse(image.originalname).name;
    // const filename = Date.now() + "-" + originalName + ".webp";
    // const file = await sharp(image.buffer).resize(800).webp({ effort: 3 });
    // return file;
  }
}
