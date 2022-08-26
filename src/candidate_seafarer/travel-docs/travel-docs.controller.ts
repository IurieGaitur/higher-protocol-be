import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { TravelDocsService } from './travel-docs.service';
import { CreateTravelDocDto } from './dto/create-travel-doc.dto';
import { UpdateTravelDocDto } from './dto/update-travel-doc.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Seafarer/Travel_Docs')
@ApiBearerAuth()
@Controller('seafarers/travel-docs')
export class TravelDocsController {
  constructor(private readonly travelDocsService: TravelDocsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('travel_doc', { dest: './files/travel_doc' }))
  create(@UploadedFile() file, @Body() createTravelDocDto: CreateTravelDocDto) {
    createTravelDocDto.file_doc = file.filename;
    return this.travelDocsService.create(createTravelDocDto);
  }

  @Get('profile/:id')
  findAll(@Param('id') id: number) {
    return this.travelDocsService.findAllOfProfile(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.travelDocsService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('travel_doc', { dest: './files/travel_doc' }))
  update(@Param('id') id: string, @UploadedFile() file, @Body() updateTravelDocDto: UpdateTravelDocDto) {
    updateTravelDocDto.file_doc = file.filename;
    return this.travelDocsService.update(+id, updateTravelDocDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.travelDocsService.remove(+id);
  }
}
