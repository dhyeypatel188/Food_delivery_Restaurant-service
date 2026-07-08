import { Module } from '@nestjs/common';
import { HoursRepository } from './hours.repository';
import { HoursService } from './hours.service';
import { HoursController } from './hours.controller';

@Module({
  controllers: [HoursController],
  providers: [HoursService, HoursRepository],
})
export class HoursModule {}
