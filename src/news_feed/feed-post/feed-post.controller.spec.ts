import { Test, TestingModule } from '@nestjs/testing';
import { FeedPostController } from './feed-post.controller';
import { FeedPostService } from './feed-post.service';

describe('FeedPostController', () => {
  let controller: FeedPostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedPostController],
      providers: [FeedPostService],
    }).compile();

    controller = module.get<FeedPostController>(FeedPostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
