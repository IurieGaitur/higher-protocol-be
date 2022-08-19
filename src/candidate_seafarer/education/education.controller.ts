import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EducationService } from './education.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Seafarer/Education')
@ApiBearerAuth()
@Controller('seafarer/education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Post()
  create(@Body() createEducationDto: CreateEducationDto) {
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
  update(@Param('id') id: string, @Body() updateEducationDto: UpdateEducationDto) {
    return this.educationService.update(+id, updateEducationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.educationService.remove(+id);
  }
}
