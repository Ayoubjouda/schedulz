import { PrismaService } from "./../prisma/prisma.service";
import { Controller, Get } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(
    private usersService: UsersService,
    private prisma: PrismaService
  ) {}

  @Get("categories")
  async getCategories() {
    const categories = await this.prisma.categories.findMany({});

    return categories;
  }
}
