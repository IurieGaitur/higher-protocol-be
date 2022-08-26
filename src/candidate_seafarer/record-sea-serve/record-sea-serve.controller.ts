import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecordSeaServeService } from './record-sea-serve.service';
import { CreateRecordSeaServeDto } from './dto/create-record-sea-serve.dto';
import { UpdateRecordSeaServeDto } from './dto/update-record-sea-serve.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Seafarer/Record_Sea_Serve')
@ApiBearerAuth()
@Controller('seafarers/record-sea-serves')
export class RecordSeaServeController {
  constructor(private readonly recordSeaServeService: RecordSeaServeService) {}

  @Post()
  create(@Body() createRecordSeaServeDto: CreateRecordSeaServeDto) {
    return this.recordSeaServeService.create(createRecordSeaServeDto);
  }

  @Get('profile/:id')
  findAll(@Param('id') id: number) {
    return this.recordSeaServeService.findAllOfProfile(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recordSeaServeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecordSeaServeDto: UpdateRecordSeaServeDto) {
    return this.recordSeaServeService.update(+id, updateRecordSeaServeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recordSeaServeService.remove(+id);
  }
}
