import { PrismaService } from "./../prisma/prisma.service";
import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthDto, SigninDto, GoogleSigninDto } from "src/dto";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService, private httpService: HttpService) {}

  async signup(dto: AuthDto) {
    try {
      console.log(dto);
      const hash = await argon.hash(dto.password);
      const user = await this.prisma.user.create({
        data: {
          username: dto.username.toLowerCase(),
          email: dto.email,
          hash: hash,
          profilePicture: "http://141.145.200.78:3008/files/NoPicture.png",
        },
      });
      return this.signToken(user.id, user.email, user.username, user.profilePicture);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException("Email or username already exists");
      }
    }
  }

  async signin(dto: SigninDto) {
    console.log(dto);
    const user = await this.prisma.user.findUnique({
      where: {
        username: dto.username.toLowerCase(),
      },
    });
    if (!user) throw new UnauthorizedException("Credentials incorrect");

    const pwMatches = await argon.verify(user.hash, dto.password);
    if (!pwMatches) throw new UnauthorizedException("Credentials incorrect");
    return this.signToken(user.id, user.email, user.username, user.profilePicture);
  }

  async googleSignin(dto: GoogleSigninDto) {
    try {
      const headersRequest = {
        Accept: "*/*",

        Connection: "Keep-alive", // afaik this one is not needed
        Authorization: `Bearer ${dto.access_token}`,
      };

      const googleApiResult = await this.httpService.axiosRef.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: headersRequest,
      });

      console.log(googleApiResult.data);

      if (!googleApiResult) throw new UnauthorizedException();
      const userData = googleApiResult.data;

      const user = await this.prisma.user.upsert({
        where: {
          email: userData.email,
        },
        update: {},
        create: {
          username: userData.name.toLowerCase(),
          email: userData.email,
        },
      });

      return this.signToken(userData.id, userData.email, userData.name, userData.profilePicture);
    } catch (error) {
      throw Error(error);
    }
  }

  async signToken(userId: string, userEmail: string, usename: string, profilePicture: string) {
    const payload = {
      sub: userId,
      userEmail,
      usename,
      profilePicture,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: "15m",
      secret: "super-secret",
    });

    return {
      access_token: token,
    };
  }
}
