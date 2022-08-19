import { PartialType } from '@nestjs/swagger';
import { CreateRecordSeaServeDto } from './create-record-sea-serve.dto';

export class UpdateRecordSeaServeDto extends PartialType(CreateRecordSeaServeDto) {}
