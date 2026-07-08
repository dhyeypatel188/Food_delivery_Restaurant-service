import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemRepository } from './item.repository';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';

@Injectable()
export class ItemService {
  constructor(private readonly itemRepository: ItemRepository) {}

  async create(restaurantId: string, dto: CreateMenuItemDto) {
    return this.itemRepository.create(restaurantId, dto);
  }

  async findAll(restaurantId: string, categoryId?: string) {
    return this.itemRepository.findMany(restaurantId, categoryId);
  }

  async findOne(id: string) {
    const item = await this.itemRepository.findUnique(id);
    if (!item) throw new NotFoundException('Menu item not found');
    return item;
  }

  async update(id: string, dto: UpdateMenuItemDto) {
    await this.findOne(id);
    return this.itemRepository.update(id, dto);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.itemRepository.delete(id);
    return { message: 'Menu item deleted' };
  }

  async toggleAvailability(id: string, isAvailable: boolean) {
    await this.findOne(id);
    return this.itemRepository.toggleAvailability(id, isAvailable);
  }
}
