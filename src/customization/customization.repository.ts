import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomizationDto } from './dto/create-customization.dto';

@Injectable()
export class CustomizationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(itemId: string, dto: CreateCustomizationDto) {
    const { options, ...groupData } = dto;
    return this.prisma.item_Customization.create({
      data: {
        menu_item_id: itemId,
        ...groupData,
        options: { create: options },
      },
      include: { options: true },
    });
  }

  async findMany(itemId: string) {
    return this.prisma.item_Customization.findMany({
      where: { menu_item_id: itemId },
      include: { options: true },
    });
  }

  async findUnique(id: string) {
    return this.prisma.item_Customization.findUnique({
      where: { id },
      include: { options: true },
    });
  }

  async delete(id: string) {
    return this.prisma.item_Customization.delete({ where: { id } });
  }
}
