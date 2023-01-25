import { PrismaClient } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { PrismaClientValidationError } from "@prisma/client/runtime";
import { domainToASCII } from "url";

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}
  async savepost(
    files: Array<Express.Multer.File>,
    PostData: any,
    userToken: any
  ) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: userToken.user.userEmail,
      },
    });

    if (!user) return "user not found";

    const course = await this.prisma.course.create({
      data: {
        userId: user.id,
        title: PostData.title,
        description: PostData.description,
      },
    });

    if (!course) throw PrismaClientValidationError;
    const filesdata = files.map((element) => ({
      courseId: course.id,
      filePath: element.path,
    }));

    const courseMedia = await this.prisma.courseMedia.createMany({
      data: filesdata,
    });
    const Categoriesarray = JSON.parse(PostData.categories);

    // const categoriesData = Categoriesarray.map((element) => ({
    //   postId: post.id,
    //   categoryId: element.id,
    // }));

    return {
      statusCode: 201,
      message: `Post ${course.id} Created Successfully`,
    };
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
      msg: "Categorie Added Succesfuly",
    };
  }
}
