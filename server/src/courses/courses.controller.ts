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
    return this.coursesService.deleteCourse(data.id);
  }
  @UseGuards(AuthGuard("jwt"))
  @Post("buy")
  BuyCourse(@Body() data: any, @Req() req: Request) {
    console.log(data);
    return this.coursesService.buyCourse(data.courseId, req.user);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("usercourses")
  getUserPurshasedCourses(@Req() req: Request) {
    return this.coursesService.getUserCourses(req.user);
  }

  @Get("getCategories")
  getCategories() {
    return this.coursesService.getCategories();
  }
  @UseGuards(AuthGuard("jwt"))
  @Post("getcoursebyid")
  getCourseById(@Body() data: any, @Req() req: Request) {
    return this.coursesService.getCourseById(data.courseId, req.user);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("editcourse")
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
  EditCourse(@Body() data: any, @UploadedFiles() files: Array<Express.Multer.File>, @Req() req: Request) {
    return this.coursesService.EditCourse(files, data, req.user);
  }
}
