import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {

  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>
  ) {}

  create(createCommentDto: CreateCommentDto) {
    const created = this.commentRepo.save(createCommentDto)
    return created;
  }

  async findAllOfProfile(user_id: number)  {
    return await this.commentRepo.findBy({'creator_id': user_id})
  }

  async update(id: number, updateCommenteDto: UpdateCommentDto) {
    const candidate = await this.commentRepo.update(id, updateCommenteDto);
    return candidate;
  }

  async remove(id: number) {
    const candidate = await this.findOne(id);
   await this.commentRepo.delete(id);
  }

  private async findOne(id: number) {
    const candidate = await this.commentRepo.findOneBy({'id': id});
    return candidate;
  }
}
