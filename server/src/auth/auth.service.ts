import { ConfigService } from "@nestjs/config";
import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import { HttpService } from "@nestjs/axios";
import { AuthDto, SigninDto, GoogleSigninDto } from "src/dto";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
 );
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private httpService: HttpService,
    private config: ConfigService
  ) {}

  async signup(dto: AuthDto) {
    try {
      const hash = await argon.hash(dto.password);
      const user = await this.prisma.user.create({
        data: {
          username: dto.username.toLowerCase(),
          email: dto.email.toLowerCase(),
          hash: hash,
          profilePicture: `${this.config.get("API_URL")}files/NoPicture.png`,
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
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email.toLowerCase(),
      },
    });
    if (!user) throw new UnauthorizedException("Credentials incorrect");

    const pwMatches = await argon.verify(user.hash, dto.password);
    if (!pwMatches) throw new UnauthorizedException("Credentials incorrect");
    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
      profilePicture: user.profilePicture,
      firstName: user.firstName,
      lastName: user.lastName,
      admin: user.Admin,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: "300m",
      secret: this.config.get("SECRET_KEY"),
    });

    return {
      statusCode: 200,
      access_token: token,
    };
  }

  async googleSignin(dto: GoogleSigninDto) {
    try {

      const googleApiResult = await client.verifyIdToken({
        idToken: dto.access_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      
      console.log(googleApiResult);
      if (!googleApiResult) throw new UnauthorizedException();
      const userData = googleApiResult.getPayload();

      const user = await this.prisma.user.upsert({
        where: {
          email: userData.email,
        },
        update: {},
        create: {
          username: userData.name.toLowerCase(),
          email: userData.email,
          profilePicture: userData.picture,
        },
      });

      const payload = {
        id: user.id,
        email: user.email,
        username: user.username,
        profilePicture: user.profilePicture,
        firstName: user.firstName,
        lastName: user.lastName,
        admin: user.Admin,
      };

      const token = await this.jwt.signAsync(payload, {
        expiresIn: "1m",
        secret: this.config.get("SECRET_KEY"),
      });

      return {
        statusCode: 200,
        access_token: token,
      };
    } catch (error) {
      throw Error(error);
    }
  }

  async signToken(userId: string, userEmail: string, username: string, profilePicture: string) {
    const payload = {
      id: userId,
      email: userEmail,
      username: username,
      profilePicture: profilePicture,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: "300m",
      secret: this.config.get("SECRET_KEY"),
    });

    return {
      access_token: token,
    };
  }
}
