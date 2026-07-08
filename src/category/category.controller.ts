import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('restaurants/:restaurantId/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Param('restaurantId') restaurantId: string, @Body() dto: CreateCategoryDto) {
    return this.categoryService.create(restaurantId, dto);
  }

  @Get()
  findAll(@Param('restaurantId') restaurantId: string) {
    return this.categoryService.findAll(restaurantId);
  }

  @Get(':categoryId')
  findOne(@Param('categoryId') categoryId: string) {
    return this.categoryService.findOne(categoryId);
  }

  @Patch(':categoryId')
  update(@Param('categoryId') categoryId: string, @Body() dto: UpdateCategoryDto) {
    return this.categoryService.update(categoryId, dto);
  }

  @Delete(':categoryId')
  remove(@Param('categoryId') categoryId: string) {
    return this.categoryService.remove(categoryId);
  }
}
