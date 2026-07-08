import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(restaurantId: string, dto: CreateCategoryDto) {
    return this.categoryRepository.create(restaurantId, dto);
  }

  async findAll(restaurantId: string) {
    return this.categoryRepository.findMany(restaurantId);
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findUnique(id);
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async update(id: string, dto: UpdateCategoryDto) {
    await this.findOne(id);
    return this.categoryRepository.update(id, dto);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.categoryRepository.delete(id);
    return { message: 'Category deleted' };
  }
}
