import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
export class SigninDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
export class GoogleSigninDto {
  @IsString()
  @IsNotEmpty()
  access_token: string;
}
