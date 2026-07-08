import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';

@Controller('restaurants/:restaurantId/items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  create(@Param('restaurantId') restaurantId: string, @Body() dto: CreateMenuItemDto) {
    return this.itemService.create(restaurantId, dto);
  }

  @Get()
  findAll(
    @Param('restaurantId') restaurantId: string,
    @Query('category_id') categoryId?: string,
  ) {
    return this.itemService.findAll(restaurantId, categoryId);
  }

  @Get(':itemId')
  findOne(@Param('itemId') itemId: string) {
    return this.itemService.findOne(itemId);
  }

  @Patch(':itemId')
  update(@Param('itemId') itemId: string, @Body() dto: UpdateMenuItemDto) {
    return this.itemService.update(itemId, dto);
  }

  @Delete(':itemId')
  remove(@Param('itemId') itemId: string) {
    return this.itemService.remove(itemId);
  }

  @Patch(':itemId/toggle')
  toggleAvailability(
    @Param('itemId') itemId: string,
    @Body('is_available') isAvailable: boolean,
  ) {
    return this.itemService.toggleAvailability(itemId, isAvailable);
  }
}
