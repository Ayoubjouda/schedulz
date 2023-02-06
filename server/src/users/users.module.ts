import { UsersController } from "./users.controller";
import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtStrategy } from "src/strategy";

@Module({
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
})
export class UsersModule {}
