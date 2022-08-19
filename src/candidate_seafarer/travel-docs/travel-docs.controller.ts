import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TravelDocsService } from './travel-docs.service';
import { CreateTravelDocDto } from './dto/create-travel-doc.dto';
import { UpdateTravelDocDto } from './dto/update-travel-doc.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Seafarer/Travel_Docs')
@ApiBearerAuth()
@Controller('travel-docs')
export class TravelDocsController {
  constructor(private readonly travelDocsService: TravelDocsService) {}

  @Post()
  create(@Body() createTravelDocDto: CreateTravelDocDto) {
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
  update(@Param('id') id: string, @Body() updateTravelDocDto: UpdateTravelDocDto) {
    return this.travelDocsService.update(+id, updateTravelDocDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.travelDocsService.remove(+id);
  }
}
