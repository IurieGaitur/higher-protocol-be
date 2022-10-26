import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { GoogleAuthStrategy } from './oAuthGoogle/google.strategy';
import { FacebookAuthStrategy } from './oAuthFacebook/facebook.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';

@Module({
  imports: [
    PassportModule,
    UserModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '100d'}
      }),
      inject: [ConfigService]
    }),
    UserService
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, GoogleAuthStrategy, FacebookAuthStrategy, JwtStrategy, UserService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }],
  exports: [AuthService],
})
export class AuthModule {}
