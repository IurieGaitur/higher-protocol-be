import { Controller, Request, Get, Post, UseGuards, HttpException, HttpStatus, Body, Param, Res, UseInterceptors, UploadedFile, ClassSerializerInterceptor, Req, Logger } from '@nestjs/common';
import { AppService } from './../app.service';
import { AuthService } from './../auth/auth.service';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { UserService } from './../user/user.service';
import { LoginUserDto } from './../user/dto/login-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from './auth.public';
import { DiskStorageUtil } from "./../../config/storage.config"
import { diskStorage } from 'multer';
import { Response } from 'express';
import { GoogleAuthGuard } from './oAuthGoogle/google-auth.guard';
import { FacebookAuthGuard } from './oAuthFacebook/facebook-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';


@ApiTags('User')
@Controller()
export class AuthController {
  constructor(
    private authService: AuthService, 
    private userService: UserService,
    private jwtService: JwtService) {}

  @Public()
  @Post('/login')
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@Body() loginUserDto: LoginUserDto) {
      const user = this.authService.login(loginUserDto.email, loginUserDto.password);
      return user;
  }


  @Public()
  @Post('/register')
  @UseInterceptors(FileInterceptor('user_pic', {storage: diskStorage({destination: './files/user_pic', filename: DiskStorageUtil.uniqueName})}))
  async register(@UploadedFile() file, @Body() createUserDto: CreateUserDto) {
      const user = await this.authService.register(createUserDto);
      user.image = file.filename || "";
      return user;
  }

  
  @Get('profile')
  async getProfile(@Request() req) {
    const user = await this.userService.findByIdAndEmail(req.user.id, req.user.email);
    return user;
  }

  //Gmail auth
  @Public()
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() req: Request, @Res() res: Response): Promise<any> {
  }

  @Public()
  @Get('google/auth/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    
    const category = 1;//employee default
    const { email, first_name, last_name, picture, provider } = req["user"];
    const activeUser = await this.userService.getOrCreate(email, first_name, last_name, picture, category, provider);
    const payload = { email: activeUser.email, id: activeUser.id };
    var accessToken = this.jwtService.sign(payload);
    
    res.cookie('jwt', accessToken, {
      httpOnly: true,
      sameSite: 'lax',
    });
    
    //res.json({accessToken, ...activeUser});
    res.redirect(`https://sailajob-ui.vercel.app/oauth/success?token=${accessToken}`);
  }


  //Facebook auth
  @Public()
  @Get('fb')
  @UseGuards(FacebookAuthGuard)
  async fbAuth() {
    return HttpStatus.OK;
  }

  @Public()
  @Get('fbauth/callback')
  @UseGuards(FacebookAuthGuard)
  async fbAuthRedirect(@Req() req: Request, @Res() res: Response) {
    
    
    const payload = { username: req["user"].username, sub: req["user"].id };
    // var accessToken = this.jwtService.sign(payload);
      
    // res.cookie('jwt', accessToken, {
    //   httpOnly: true,
    //   sameSite: 'lax',
    // });

    return req["user"];
  }

  // Linkedin auth

}