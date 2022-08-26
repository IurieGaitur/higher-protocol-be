import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CertificationService } from './certification.service';
import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Seafarer/Certification')
@ApiBearerAuth()
@Controller('seafarers/certifications')
export class CertificationController {
  constructor(private readonly certificationService: CertificationService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file_cert', { dest: './files/certificates' }))
  create(@UploadedFile() file, @Body() createCertificationDto: CreateCertificationDto) {
    createCertificationDto.file_cert = file.filename;
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
  @UseInterceptors(FileInterceptor('file_cert', { dest: './files/certificates' }))
  update(@Param('id') id: string, @UploadedFile() file, @Body() updateCertificationDto: UpdateCertificationDto) {
    updateCertificationDto.file_cert = file.filename;
    return this.certificationService.update(+id, updateCertificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.certificationService.remove(+id);
  }
}
