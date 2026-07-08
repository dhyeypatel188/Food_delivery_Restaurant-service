import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { HoursService } from './hours.service';
import { UpsertHoursDto } from './dto/upsert-hours.dto';

@Controller('restaurants/:restaurantId/hours')
export class HoursController {
  constructor(private readonly hoursService: HoursService) {}

  @Get()
  findAll(@Param('restaurantId') restaurantId: string) {
    return this.hoursService.getAll(restaurantId);
  }

  @Post()
  upsert(@Param('restaurantId') restaurantId: string, @Body() dto: UpsertHoursDto) {
    return this.hoursService.upsert(restaurantId, dto);
  }

  @Patch(':hourId')
  update(@Param('hourId') hourId: string, @Body() dto: Partial<UpsertHoursDto>) {
    return this.hoursService.update(hourId, dto);
  }

  @Delete(':hourId')
  remove(@Param('hourId') hourId: string) {
    return this.hoursService.remove(hourId);
  }
}
