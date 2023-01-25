import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import {
  FileInterceptor,
  AnyFilesInterceptor,
  FilesInterceptor,
} from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { CoursesService } from "./courses.service";
@Controller("courses")
export class CoursesController {
  constructor(private coursesService: CoursesService) {}
  @UseGuards(AuthGuard("jwt"))
  @Post("me")
  @UseInterceptors(
    FilesInterceptor("picture[]", 5, {
      storage: diskStorage({
        destination: "./files",
        filename: (req, file, callback) => {
          const ext = extname(file.originalname);
          const uniqueSuffix = Date.now() + Math.random() * 1e9;
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    })
  )
  uploadpost(
    @Body() data: any,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Req() req: Request
  ) {
    // console.log(data);
    return this.coursesService.savepost(files, data, { user: req.user });
  }

  @Post("AddCategorie")
  AddCategorie(@Body() data: any) {
    return this.coursesService.AddCategorie(data);
  }
}
