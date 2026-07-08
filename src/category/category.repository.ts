import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(restaurantId: string, dto: CreateCategoryDto) {
    return this.prisma.menu_Category.create({
      data: { restaurant_id: restaurantId, ...dto },
    });
  }

  async findMany(restaurantId: string) {
    return this.prisma.menu_Category.findMany({
      where: { restaurant_id: restaurantId },
      include: { items: true },
      orderBy: { sort_order: 'asc' },
    });
  }

  async findUnique(id: string) {
    return this.prisma.menu_Category.findUnique({
      where: { id },
      include: { items: true },
    });
  }

  async update(id: string, dto: UpdateCategoryDto) {
    return this.prisma.menu_Category.update({ where: { id }, data: dto });
  }

  async delete(id: string) {
    return this.prisma.menu_Category.delete({ where: { id } });
  }
}
