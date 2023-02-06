import { Body, Controller, Delete, Get, Post, Req, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { CoursesService } from "./courses.service";

@Controller("courses")
export class CoursesController {
  constructor(private coursesService: CoursesService) {}
  @UseGuards(AuthGuard("jwt"))
  @Post("addcourse")
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: "overview", maxCount: 1 },
        { name: "thumbnail", maxCount: 1 },
      ],

      {
        storage: diskStorage({
          destination: "./files",
          filename: async (req, file, callback) => {
            const ext = extname(file.originalname);
            const uniqueSuffix = Date.now() + Math.random() * 1e9;
            const filename = `${uniqueSuffix}${ext}`;
            callback(null, filename);
          },
        }),
      }
    )
  )
  uploadpost(@Body() data: any, @UploadedFiles() files: Array<Express.Multer.File>, @Req() req: Request) {
    return this.coursesService.saveCourse(files, data, req.user);
  }

  @Post("AddCategorie")
  AddCategorie(@Body() data: any) {
    return this.coursesService.AddCategorie(data);
  }
  @Get("getAllCourses")
  GetAllCourses() {
    return this.coursesService.GetAllCourses();
  }

  @Post("deleteCourse")
  DeleteCourse(@Body() data: any) {
    console.log(data);
    return this.coursesService.deleteCourse(data.id);
  }

  @Get("getCategories")
  getCategories() {
    return this.coursesService.getCategories();
  }
}
