import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { EducationService } from './education.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Seafarer/Education')
@ApiBearerAuth()
@Controller('seafarers/educations')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file_education', { dest: './files' }))
  create(@UploadedFile() file, @Body() createEducationDto: CreateEducationDto) {
    createEducationDto.file_education = file.filename
    return this.educationService.create(createEducationDto);
  }

  @Get('profile/:id')
  findAll(@Param('id') id: number) {
    return this.educationService.findAllOfProfile(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.educationService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file_education', { dest: './files' }))
  update(@Param('id') id: string, @UploadedFile() file, @Body() updateEducationDto: UpdateEducationDto) {
    updateEducationDto.file_education = file.filename
    return this.educationService.update(+id, updateEducationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.educationService.remove(+id);
  }
}
