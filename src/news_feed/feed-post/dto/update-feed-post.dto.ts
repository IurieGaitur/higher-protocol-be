import { PartialType } from '@nestjs/swagger';
import { CreateFeedPostDto } from './create-feed-post.dto';

export class UpdateFeedPostDto extends PartialType(CreateFeedPostDto) {}
