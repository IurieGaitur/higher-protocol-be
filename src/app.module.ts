import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { JobModule } from './job/job.module';
import { AssessmentModule } from './assessment/assessment.module';
import { CandidateModule } from './candidate/candidate.module';
import { StatsModule } from './stats/stats.module';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from "typeorm";
import { ProfileModule } from './candidate_seafarer/profile/profile.module';
import { DeclarationModule } from './candidate_seafarer/declaration/declaration.module';
import { ExperienceModule } from './candidate_seafarer/experience/experience.module';
import { TravelDocsModule } from './candidate_seafarer/travel-docs/travel-docs.module';
import { EducationModule } from './candidate_seafarer/education/education.module';
import { CertificationModule } from './candidate_seafarer/certification/certification.module';
import { MedicalCertificatesModule } from './candidate_seafarer/medical-certificates/medical-certificates.module';
import { RecordSeaServeModule } from './candidate_seafarer/record-sea-serve/record-sea-serve.module';
import { FeedPostModule } from './news_feed/feed-post/feed-post.module';
import { CommentModule } from './news_feed/comment/comment.module';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions()),
    }),
    UserModule, JobModule, AssessmentModule, CandidateModule, StatsModule, AuthModule, ProfileModule, DeclarationModule, ExperienceModule, TravelDocsModule, EducationModule, CertificationModule, MedicalCertificatesModule, RecordSeaServeModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'files/*'),
    }),
    FeedPostModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService, {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }],
})
export class AppModule {}
