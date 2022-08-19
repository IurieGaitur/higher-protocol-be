import { Module } from '@nestjs/common';
import { TravelDocsService } from './travel-docs.service';
import { TravelDocsController } from './travel-docs.controller';
import { TravelDoc } from './entities/travel-doc.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TravelDoc])],
  controllers: [TravelDocsController],
  providers: [TravelDocsService]
})
export class TravelDocsModule {}
