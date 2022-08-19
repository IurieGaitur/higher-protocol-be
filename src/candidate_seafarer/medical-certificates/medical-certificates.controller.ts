import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { MedicalCertificatesService } from './medical-certificates.service';
import { CreateMedicalCertificateDto } from './dto/create-medical-certificate.dto';
import { UpdateMedicalCertificateDto } from './dto/update-medical-certificate.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express/multer';

@ApiTags('Seafarer/Medical-Certificates')
@ApiBearerAuth()
@Controller('seafarer/medical-certificates')
export class MedicalCertificatesController {
  constructor(private readonly medicalCertificatesService: MedicalCertificatesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('medical_cert', { dest: './files' }))
  create(@UploadedFile() file, @Body() createMedicalCertificateDto: CreateMedicalCertificateDto) {
    return this.medicalCertificatesService.create(createMedicalCertificateDto);
  }

  @Get('profile/:id')
  findAll(@Param('id') id: number) {
    return this.medicalCertificatesService.findAllOfProfile(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicalCertificatesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicalCertificateDto: UpdateMedicalCertificateDto) {
    return this.medicalCertificatesService.update(+id, updateMedicalCertificateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicalCertificatesService.remove(+id);
  }
}
