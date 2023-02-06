import { ConfigService } from "@nestjs/config";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { ForbiddenException, Injectable, UnauthorizedException, HttpException, HttpStatus } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import * as argon from "argon2";
import * as fs from "fs";
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {}
  async EditUser(files: Array<Express.Multer.File>, data, user) {
    const userData = JSON.parse(data.data);

    const userCheck = await this.prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });
    if (!userCheck) throw new UnauthorizedException("User non Existant");
    const profilePictureFile = files?.["profilePicture"];

    try {
      let hash = null;
      let pwdMatch = null;
      if (!!userData?.currentPassword) pwdMatch = await argon.verify(userCheck.hash, userData?.currentPassword);

      if (!!userData?.newPassword && pwdMatch) {
        hash = await argon.hash(userData?.newPassword);
      } else if (!!userData?.newPassword && !pwdMatch) {
        throw new HttpException("Password Incorrect", HttpStatus.UNAUTHORIZED);
      }

      let oldPicture = user.profilePicture;
      oldPicture = oldPicture.replace(this.config.get("API_URL"), "");

      delete userData?.currentPassword;
      delete userData?.newPassword;
      const updateUser = await this.prisma.user.update({
        where: {
          email: user.email.toLowerCase(),
        },
        data: {
          ...userData,
          ...(hash ? { hash: hash } : {}),
          ...(profilePictureFile?.[0]
            ? { profilePicture: `${this.config.get("API_URL")}${profilePictureFile[0]?.path}` }
            : {}),
        },
      });
      if (!updateUser) throw PrismaClientKnownRequestError;

      if (profilePictureFile?.[0]) {
        await fs.unlink(`./${oldPicture}`, (err) => {
          if (err) {
            console.error(err);
            return err;
          }
        });
      }

      const payload = {
        id: updateUser.id,
        email: updateUser.email,
        username: updateUser.username,
        profilePicture: updateUser.profilePicture,
        admin: updateUser.Admin,
        firstName: updateUser.firstName,
        lastName: updateUser.lastName,
      };

      const token = await this.jwt.signAsync(payload, {
        expiresIn: "300m",
        secret: this.config.get("SECRET_KEY"),
      });

      return { statusCode: 201, access_token: token };
    } catch (error) {
      throw error;
    }
  }
}
