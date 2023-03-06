import {
  Injectable,
  MethodNotAllowedException,
  UnauthorizedException,
  HttpStatus,
  HttpException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { PrismaClientValidationError } from "@prisma/client/runtime";
import * as fs from "fs";

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
          title: courseData.title,
          description: courseData.description,
          instructor: courseData.instructor,
          skillLevel: courseData.skillLevel,
          captions: courseData.captions === "Yes" ? true : false,
          categorie: courseData.categorie,
          videoUrl: courseData.videoUrl,
          price: courseData.price,
          language: courseData.language,
          schedule: data.schedule,
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
    console.log(id);
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
  async buyCourse(courseId: string, user: any) {
    try {
      const courseCheck = await this.prisma.course.findFirst({
        where: {
          id: courseId,
        },
      });
      if (!courseCheck) throw new HttpException("Course Not Found", HttpStatus.NOT_FOUND);
      const course = await this.prisma.userCourses.findFirst({
        where: {
          userId: user.id,
          courseId: courseId,
        },
      });
      if (course) throw new HttpException("Course Already Purshased", HttpStatus.FORBIDDEN);
      const createdcourse = await this.prisma.userCourses.create({
        data: {
          userId: user.id,
          courseId: courseId,
        },
      });
      if (!createdcourse) throw PrismaClientValidationError;
      return new HttpException("Course Purshased Successfuly", HttpStatus.OK);
    } catch (error) {
      throw error;
    }
  }
  async getUserCourses(user: any) {
    try {
      const userCourses = await this.prisma.user.findUnique({
        where: {
          email: user.email,
        },
        select: {
          UserCourses: true,
        },
      });
      return userCourses;
    } catch (error) {
      throw error;
    }
  }
  async getCourseById(courseId: string = "", user: any) {
    try {
      const courseCheck = await this.prisma.course.findFirst({
        where: {
          id: courseId,
        },
        include: {
          PostMedia: true,
        },
      });

      if (!courseCheck) throw new HttpException("Course Not Found", HttpStatus.NOT_FOUND);
      const course = await this.prisma.userCourses.findFirst({
        where: {
          userId: user.id,
          courseId: courseId,
        },
      });
      const userCheck = await this.prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });
      if (!userCheck.Admin) {
        if (!course) throw new HttpException("You need to Purshase this Course First", HttpStatus.FORBIDDEN);
      }
      return new HttpException(courseCheck, HttpStatus.OK);
    } catch (error) {
      throw error;
    }
  }

  async EditCourse(files: Array<Express.Multer.File>, data: any, user: any) {
    const courseData = JSON.parse(data.data);
    const overViewPicture = files?.["overview"];
    const thumbnailPicture = files?.["thumbnail"];

    const userCheck = await this.prisma.user.findUnique({
      where: {
        email: user.email.toLowerCase(),
      },
    });
    if (!userCheck) return "user not found";
    const courseCheck = await this.prisma.course.findUnique({
      where: {
        id: courseData.id,
      },
      include: {
        PostMedia: true,
      },
    });
    if (!courseCheck) return "Course not found";

    const updatedCourse = { ...courseData };
    delete updatedCourse.id;
    const updateCourse = await this.prisma.course.update({
      where: {
        id: courseData.id,
      },
      data: {
        ...updatedCourse,
        schedule: data.schedule ? data.schedule : undefined,
      },
    });

    if (overViewPicture?.[0]) {
      fs.unlink(`./${courseCheck?.PostMedia[0].filePath}`, (err) => {
        if (err) {
          console.error(err);
          return err;
        }
      });

      await this.prisma.courseMedia.updateMany({
        where: {
          courseId: courseCheck.id,
          AND: {
            type: "overView",
          },
        },
        data: {
          filePath: overViewPicture?.[0]?.path,
        },
      });
    }

    console.log(courseCheck?.PostMedia?.[1]);

    if (thumbnailPicture?.[0]) {
      fs.unlink(`./${courseCheck?.PostMedia?.[1].filePath}`, (err) => {
        if (err) {
          console.error(err);
          return err;
        }
      });
      await this.prisma.courseMedia.updateMany({
        where: {
          courseId: courseCheck.id,
          AND: {
            type: "thumbnail",
          },
        },
        data: {
          filePath: thumbnailPicture?.[0]?.path,
        },
      });
    }
    return new HttpException("Course Edited Successfuly", HttpStatus.OK);
  }
}
