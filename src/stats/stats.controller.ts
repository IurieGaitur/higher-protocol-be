import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StatsService } from './stats.service';
import { CreateStatDto } from './dto/create-stat.dto';
import { UpdateStatDto } from './dto/update-stat.dto';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { LocalAuthGuard } from './../auth/local-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Stats')
@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Post()
  create(@Body() createStatDto: CreateStatDto) {
    return this.statsService.create(createStatDto);
  }

  @Get()
  findAll() {
    return this.statsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatDto: UpdateStatDto) {
    return this.statsService.update(+id, updateStatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statsService.remove(+id);
  }
}
