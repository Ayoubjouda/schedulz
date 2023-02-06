import { Body, Controller, Post } from "@nestjs/common";
import { AuthDto, SigninDto, GoogleSigninDto } from "src/dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post("signin")
  login(@Body() dto: SigninDto) {
    return this.authService.signin(dto);
  }
  @Post("signup")
  signup(@Body() dto: AuthDto) {
    console.log(dto);
    return this.authService.signup(dto);
  }

  @Post("googlesignin")
  googleSignin(@Body() dto: GoogleSigninDto) {
    return this.authService.googleSignin(dto);
  }
}
