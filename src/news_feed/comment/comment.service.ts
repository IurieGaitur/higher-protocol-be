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
    createCommentDto.created_at = new Date();
    const created = this.commentRepo.save(createCommentDto)
    return created;
  }

  async findAllOfPost(post_id: number) {
    const comment = await this.commentRepo.findBy({'post_id': post_id});
    return comment;
  }

  async update(id: number, updateCommenteDto: UpdateCommentDto) {
    const comment = await this.commentRepo.update(id, updateCommenteDto);
    return comment;
  }

  async remove(id: number) {
    const comment = await this.findOne(id);
   await this.commentRepo.delete(id);
  }

  private async findOne(id: number) {
    const comment = await this.commentRepo.findOneBy({'id': id});
    return comment;
  }
}
