import { Module } from '@nestjs/common';
import { RecordSeaServeService } from './record-sea-serve.service';
import { RecordSeaServeController } from './record-sea-serve.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordSeaServe } from './entities/record-sea-serve.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecordSeaServe])],
  controllers: [RecordSeaServeController],
  providers: [RecordSeaServeService]
})
export class RecordSeaServeModule {}
