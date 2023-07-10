import {Controller, Post, UseGuards, Request, Get} from "@nestjs/common";
import {ApiControllerPrefix} from "@smart-home/shared/util";
import { AuthService } from "./auth.service";
import {LocalAuthGuard} from "./local-auth.guard";
import {JwtAuthGuard} from "./jwt-auth.guard";

@Controller(ApiControllerPrefix.Auth)
export class AuthController {
     constructor(private authService: AuthService) {
     }

     @UseGuards(LocalAuthGuard)
     @Post()
     login(@Request() req: any){
          return this.authService.login(req.user);
     }

     @UseGuards(JwtAuthGuard)
     @Get()
     getProfile(@Request() req: any){
          return req.user
     }
}