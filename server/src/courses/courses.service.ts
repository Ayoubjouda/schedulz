import { Injectable, MethodNotAllowedException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { PrismaClientValidationError } from "@prisma/client/runtime";

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}
  async saveCourse(files: Array<Express.Multer.File>, data: any, user: any) {
    const courseData = JSON.parse(data.data);
    const userCheck = await this.prisma.user.findUnique({
      where: {
        email: user.email.toLowerCase(),
      },
    });
    if (!userCheck) return "user not found";
    try {
      const course = await this.prisma.course.create({
        data: {
          userId: userCheck.id,
          title: courseData.title,
          description: courseData.description,
          instructor: courseData.instructor,
          skillLevel: courseData.skillLevel,
          captions: courseData.captions === "Yes" ? true : false,
          categorie: courseData.categorie,
          videoUrl: courseData.videoUrl,
          price: courseData.price,
          language: courseData.language,
        },
      });
      if (!course) throw new PrismaClientValidationError();
      const overview = files["overview"];
      const thumbnail = files["thumbnail"];

      const filesdata = [
        {
          courseId: course.id,
          filePath: overview[0].path,
          type: overview[0].fieldname,
        },
        {
          courseId: course.id,
          filePath: thumbnail[0].path,
          type: thumbnail[0].fieldname,
        },
      ];

      if (!thumbnail && !overview) throw new MethodNotAllowedException();
      const courseMedia = await this.prisma.courseMedia.createMany({
        data: filesdata,
      });

      return {
        statusCode: 201,
        message: `Post ${course.id} Created Successfully`,
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteCourse(id: string) {
    const deletedCourse = await this.prisma.course.delete({
      where: {
        id: id,
      },
    });

    if (!deletedCourse) throw new UnauthorizedException();
    return {
      msg: "Course Deleted Successfuly",
    };
  }

  async GetAllCourses() {
    const courses = await this.prisma.course.findMany({
      include: {
        PostMedia: true,
      },
    });

    courses.sort(function (a, b) {
      var dateA = new Date(a.createdAt);
      var dateB = new Date(b.createdAt);
      return dateA > dateB ? -1 : 1;
    });
    return courses;
  }

  // Get Posts Service
  async AddCategorie(data: any) {
    const categorie = await this.prisma.categories.create({
      data: {
        categorieName: data.categorieName,
      },
    });
    if (!categorie) throw Error;
    return {
      statusCode: 200,
      msg: "Categorie Added Succesfuly",
    };
  }

  async getCategories() {
    const categories = await this.prisma.categories.findMany({});

    return categories;
  }
}
