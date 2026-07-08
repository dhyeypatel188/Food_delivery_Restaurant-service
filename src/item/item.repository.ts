import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';

@Injectable()
export class ItemRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(restaurantId: string, dto: CreateMenuItemDto) {
    return this.prisma.menu_Item.create({
      data: { restaurant_id: restaurantId, ...dto },
      include: { category: true },
    });
  }

  async findMany(restaurantId: string, categoryId?: string) {
    return this.prisma.menu_Item.findMany({
      where: {
        restaurant_id: restaurantId,
        ...(categoryId && { category_id: categoryId }),
      },
      include: { category: true, customizations: { include: { options: true } } },
    });
  }

  async findUnique(id: string) {
    return this.prisma.menu_Item.findUnique({
      where: { id },
      include: { category: true, customizations: { include: { options: true } } },
    });
  }

  async update(id: string, dto: UpdateMenuItemDto) {
    return this.prisma.menu_Item.update({
      where: { id },
      data: dto,
      include: { category: true },
    });
  }

  async delete(id: string) {
    return this.prisma.menu_Item.delete({ where: { id } });
  }

  async toggleAvailability(id: string, isAvailable: boolean) {
    return this.prisma.menu_Item.update({
      where: { id },
      data: { is_available: isAvailable },
    });
  }
}
