import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpsertHoursDto } from './dto/upsert-hours.dto';

@Injectable()
export class HoursRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(restaurantId: string) {
    return this.prisma.operating_Hours.findMany({
      where: { restaurant_id: restaurantId },
      orderBy: { day_of_week: 'asc' },
    });
  }

  async findById(id: string) {
    return this.prisma.operating_Hours.findUnique({ where: { id } });
  }

  async upsert(restaurantId: string, dto: UpsertHoursDto) {
    // find existing row for this restaurant + day
    const existing = await this.prisma.operating_Hours.findFirst({
      where: { restaurant_id: restaurantId, day_of_week: dto.day_of_week },
    });
    if (existing) {
      return this.prisma.operating_Hours.update({
        where: { id: existing.id },
        data: dto,
      });
    }
    return this.prisma.operating_Hours.create({
      data: { restaurant_id: restaurantId, ...dto },
    });
  }

  async update(id: string, dto: Partial<UpsertHoursDto>) {
    return this.prisma.operating_Hours.update({ where: { id }, data: dto });
  }

  async delete(id: string) {
    return this.prisma.operating_Hours.delete({ where: { id } });
  }
}
