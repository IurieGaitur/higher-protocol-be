import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { MedicalCertificatesService } from './medical-certificates.service';
import { CreateMedicalCertificateDto } from './dto/create-medical-certificate.dto';
import { UpdateMedicalCertificateDto } from './dto/update-medical-certificate.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { DiskStorageUtil } from 'config/storage.config';

@ApiTags('Seafarer/Medical-Certificates')
@ApiBearerAuth()
@Controller('seafarers/medical-certificates')
export class MedicalCertificatesController {
  constructor(private readonly medicalCertificatesService: MedicalCertificatesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file_medical', {storage: diskStorage({destination: './files/medical_cert', filename: DiskStorageUtil.uniqueName})}))
  create(@UploadedFile() file, @Body() createMedicalCertificateDto: CreateMedicalCertificateDto) {
    createMedicalCertificateDto.med_file = file?.file || ""
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
  @UseInterceptors(FileInterceptor('file_medical', {storage: diskStorage({destination: './files/medical_cert', filename: DiskStorageUtil.uniqueName})}))
  update(@Param('id') id: string, @UploadedFile() file, @Body() updateMedicalCertificateDto: UpdateMedicalCertificateDto) {
    updateMedicalCertificateDto.med_file = file.filename
    return this.medicalCertificatesService.update(+id, updateMedicalCertificateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicalCertificatesService.remove(+id);
  }
}
