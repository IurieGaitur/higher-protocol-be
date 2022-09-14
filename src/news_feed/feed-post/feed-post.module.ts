import { Module } from '@nestjs/common';
import { FeedPostService } from './feed-post.service';
import { FeedPostController } from './feed-post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedPost } from './entities/feed-post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FeedPost])],
  controllers: [FeedPostController],
  providers: [FeedPostService]
})
export class FeedPostModule {}
