import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { OAuth2Strategy, VerifyCallback, Strategy } from 'passport-facebook';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FacebookAuthStrategy extends PassportStrategy(Strategy, 'facebook') {

    constructor(private configService: ConfigService) {
      super({
        clientID: configService.get("APP_ID"),
        clientSecret: configService.get("APP_SECRET"),
        callbackURL: configService.get("FB_REDIRECT_URI"),
        passReqToCallback: true,
        scope: ['email', 'profile'],
      });
    }
  
    async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
      const { name, emails, photos } = profile
      const user = {
        email: emails[0].value,
        firstName: name.givenName,
        lastName: name.familyName,
        picture: photos[0].value,
        accessToken
      }
      done(null, user);
    }
}