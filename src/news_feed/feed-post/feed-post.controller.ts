import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FeedPostService } from './feed-post.service';
import { CreateFeedPostDto } from './dto/create-feed-post.dto';
import { UpdateFeedPostDto } from './dto/update-feed-post.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { FeedPost } from './entities/feed-post.entity';

@ApiTags('FeedPost')
@ApiBearerAuth()
@Controller('feed-posts')
export class FeedPostController {
  constructor(private readonly feedPostService: FeedPostService) {}

  
  @Post()
  create(@Body() createFeedPostDto: CreateFeedPostDto) {
    return this.feedPostService.create(createFeedPostDto);
  }

  
  @ApiQuery({name: 'limit', required: false})
  @ApiQuery({name: 'page', required: false})
  @ApiQuery({name: 'search', required: false})
  @ApiQuery({name: 'sortBy', required: false})
  @Get()
  findAll(@Paginate() query: PaginateQuery): Promise<Paginated<FeedPost>>  {
    return this.feedPostService.findAll(query);
  }

  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedPostService.findOne(+id);
  }

  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeedPostDto: UpdateFeedPostDto) {
    return this.feedPostService.update(+id, updateFeedPostDto);
  }

  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedPostService.remove(+id);
  }
}
