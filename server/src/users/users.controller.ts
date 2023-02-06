import { PrismaService } from "../prisma/prisma.service";
import { Controller, Post, UseInterceptors, UseGuards, Body, UploadedFiles, Req } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Request } from "express";

import { AuthGuard } from "@nestjs/passport";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";

@Controller("user")
export class UsersController {
  constructor(private usersService: UsersService, private prisma: PrismaService) {}
  @UseGuards(AuthGuard("jwt"))
  @Post("editprofile")
  @UseInterceptors(
    FileFieldsInterceptor([{ name: "profilePicture", maxCount: 1 }], {
      storage: diskStorage({
        destination: "./files",
        filename: async (req, file, callback) => {
          const ext = extname(file.originalname);
          const uniqueSuffix = Date.now() + Math.random() * 1e9;
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    })
  )
  EditProfile(@Body() data: any, @UploadedFiles() files: Array<Express.Multer.File>, @Req() req: Request) {
    return this.usersService.EditUser(files, data, req.user);
  }
}
