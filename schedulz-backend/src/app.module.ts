import { Module } from "@nestjs/common";

import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { CoursesModule } from "./courses/courses.module";
import { MulterModule } from "@nestjs/platform-express";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { UsersModule } from "./users/users.module";
import { UsersService } from "./users/users.service";

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    CoursesModule,
    MulterModule.register({ dest: "./uploads" }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", ""),
    }),
    UsersModule,
  ],
  providers: [UsersService],
})
export class AppModule {}
