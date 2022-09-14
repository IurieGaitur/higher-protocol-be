import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Repository } from 'typeorm';
import { CreateFeedPostDto } from './dto/create-feed-post.dto';
import { UpdateFeedPostDto } from './dto/update-feed-post.dto';
import { FeedPost } from './entities/feed-post.entity';

@Injectable()
export class FeedPostService {

  constructor(
    @InjectRepository(FeedPost)
    private readonly feedPostRepo: Repository<FeedPost>
  ) {}

  create(createFeedPostDto: CreateFeedPostDto) {
    const created = this.feedPostRepo.save(createFeedPostDto)
    return created;
  }

  async findAllOfProfile(user_id: number)  {
    return await this.feedPostRepo.findBy({'creator_id': user_id})
  }

  async findAll(query: PaginateQuery): Promise<Paginated<FeedPost>>  {
    return paginate(query, this. feedPostRepo, {
      sortableColumns: ['id', 'created_at'],
      searchableColumns: ['text', 'creator_id'],
      defaultSortBy: [['created_at', 'DESC']]
    })
  }

  async findOne(id: number) {
    const candidate = await this.feedPostRepo.findOneBy({'id': id});
    return candidate;
  }

  async update(id: number, updateFeedPostDto: UpdateFeedPostDto) {
    const candidate = await this.feedPostRepo.update(id, updateFeedPostDto);
    return candidate;
  }

  async remove(id: number) {
    const candidate = await this.findOne(id);
   await this.feedPostRepo.delete(id);
  }
}
