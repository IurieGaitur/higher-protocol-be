import { PartialType } from '@nestjs/swagger';
import { CreateTravelDocDto } from './create-travel-doc.dto';

export class UpdateTravelDocDto extends PartialType(CreateTravelDocDto) {}
