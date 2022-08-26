import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Seafarer/Experience')
@ApiBearerAuth()
@Controller('seafarers/experiences')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file_experience', { dest: './files/experience' }))
  create(@UploadedFile() file, @Body() createExperienceDto: CreateExperienceDto) {
    createExperienceDto.file_experience = file.filename;
    return this.experienceService.create(createExperienceDto);
  }

  @Get('profile/:id')
  findAll(@Param('id') id: number) {
    return this.experienceService.findAllOfProfile(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.experienceService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file_experience', { dest: './files/experience' }))
  update(@Param('id') id: string, @UploadedFile() file, @Body() updateExperienceDto: UpdateExperienceDto) {
    updateExperienceDto.file_experience = file.filename;
    return this.experienceService.update(+id, updateExperienceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.experienceService.remove(+id);
  }
}
