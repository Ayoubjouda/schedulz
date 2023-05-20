import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { MulterModule } from "@nestjs/platform-express";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { CoursesModule } from "./courses/courses.module";
import { UsersModule } from "./users/users.module";
import { UsersService } from "./users/users.service";
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    CoursesModule,
    { ...JwtModule.register({}), global: true },
    MulterModule.register({ dest: "../files" }),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, "..", "files"), serveRoot: "/files" }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
    }),

    UsersModule,
  ],
  providers: [UsersService],
})
export class AppModule {}
