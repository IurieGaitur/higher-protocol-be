import { Controller, Request, Get, Post, UseGuards, HttpException, HttpStatus, Body, Param, Res, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { CreateUserDto } from './user/dto/create-user.dto';
import { UserService } from './user/user.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginUserDto } from './user/dto/login-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('User')
@Controller()
export class AppController {
  constructor(private authService: AuthService, private appService: AppService, private userService: UserService) {}

  
  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
      const user = this.authService.login(loginUserDto.email, loginUserDto.password);
      return user;
  }

  @Post('/register')
  @UseInterceptors(FileInterceptor('user_pic', { dest: './files/user_pic' }))
  async register(@UploadedFile() file, @Body() createUserDto: CreateUserDto) {
      const user = await this.authService.register(createUserDto);
      user.image = file.filename || "";
      return user;
  }

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Request() req) {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Request() req) {
    return this.appService.googleLogin(req)
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

  @Get('medical_cert/:fileId')
  async serveMedicalCerts(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'files/medical_cert/'});
  }
}
