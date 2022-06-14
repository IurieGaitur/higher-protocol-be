import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { OAuth2Strategy, VerifyCallback } from 'passport-google-oauth2';

@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(Strategy, 'google') {

    constructor() {
      super({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: 'http://localhost:3000/auth/callback',
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