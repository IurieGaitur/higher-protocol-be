import { Controller, Request, Get, Post, UseGuards, HttpException, HttpStatus, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { CreateUserDto } from './user/dto/create-user.dto';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService, private appService: AppService, private userService: UserService) {}

  
  @Post('/login')
  async login(@Request() req) {
      const user = this.authService.login(req.body.email, req.body.password);
      return user;
  }

  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
      const user = this.authService.register(createUserDto);
      return user;
  }


  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const user = await this.userService.findByIdAndEmail(req.user.id, req.user.email);
    return user;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
