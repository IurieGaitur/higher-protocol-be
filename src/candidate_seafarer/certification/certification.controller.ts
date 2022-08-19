import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CertificationService } from './certification.service';
import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@ApiTags('Seafarer/Certification')
@ApiBearerAuth()
@Controller('seafarer/certification')
export class CertificationController {
  constructor(private readonly certificationService: CertificationService) {}

  @Post()
  create(@Body() createCertificationDto: CreateCertificationDto) {
    return this.certificationService.create(createCertificationDto);
  }

  @Get('profile/:id')
  findAllByProfile(@Param('id') id: number) {
    return this.certificationService.findAllOfProfile(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.certificationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCertificationDto: UpdateCertificationDto) {
    return this.certificationService.update(+id, updateCertificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.certificationService.remove(+id);
  }
}
