import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeclarationService } from './declaration.service';
import { CreateDeclarationDto } from './dto/create-declaration.dto';
import { UpdateDeclarationDto } from './dto/update-declaration.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Seafarer/Declaration')
@ApiBearerAuth()
@Controller('seafarer/declaration')
export class DeclarationController {
  constructor(private readonly declarationService: DeclarationService) {}

  @Post()
  create(@Body() createDeclarationDto: CreateDeclarationDto) {
    return this.declarationService.create(createDeclarationDto);
  }

  @Get('profile/:id')
  findAll(@Param('id') id: number) {
    return this.declarationService.findAllOfProfile(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.declarationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeclarationDto: UpdateDeclarationDto) {
    return this.declarationService.update(+id, updateDeclarationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.declarationService.remove(+id);
  }
}
