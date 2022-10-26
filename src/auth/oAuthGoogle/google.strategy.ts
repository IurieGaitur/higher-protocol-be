
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth2';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(Strategy, 'google') {

    constructor(private configService: ConfigService) {
      super({
        clientID: configService.get("GOOGLE_CLIENT_ID"),
        clientSecret: configService.get("GOOGLE_SECRET"),
        callbackURL: configService.get("GOOGLE_REDIRECT_URI"),
        scope: ['email', 'profile'],
      });
    }
  
    async validate (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback): Promise<any> {
      const { id, name, emails, picture } = profile;
      const user = {
        email: emails[0].value,
        first_name: name.givenName,
        last_name: name.familyName,
        picture: picture,
        provider: 'google',
        providerId: id,
      }
      done(null, user);
    }
}