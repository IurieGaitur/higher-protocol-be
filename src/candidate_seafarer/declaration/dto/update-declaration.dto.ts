import { PartialType } from '@nestjs/swagger';
import { CreateDeclarationDto } from './create-declaration.dto';

export class UpdateDeclarationDto extends PartialType(CreateDeclarationDto) {}
