import { Injectable, NotFoundException } from '@nestjs/common';
import { HoursRepository } from './hours.repository';
import { UpsertHoursDto } from './dto/upsert-hours.dto';

@Injectable()
export class HoursService {
  constructor(private readonly hoursRepository: HoursRepository) {}

  async getAll(restaurantId: string) {
    return this.hoursRepository.findAll(restaurantId);
  }

  async upsert(restaurantId: string, dto: UpsertHoursDto) {
    return this.hoursRepository.upsert(restaurantId, dto);
  }

  async update(id: string, dto: Partial<UpsertHoursDto>) {
    const existing = await this.hoursRepository.findById(id);
    if (!existing) throw new NotFoundException('Operating hours entry not found');
    return this.hoursRepository.update(id, dto);
  }

  async remove(id: string) {
    const existing = await this.hoursRepository.findById(id);
    if (!existing) throw new NotFoundException('Operating hours entry not found');
    await this.hoursRepository.delete(id);
    return { message: 'Operating hours deleted' };
  }
}
