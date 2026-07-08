import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomizationRepository } from './customization.repository';
import { ItemRepository } from '../item/item.repository';
import { CreateCustomizationDto } from './dto/create-customization.dto';

@Injectable()
export class CustomizationService {
  constructor(
    private readonly customizationRepository: CustomizationRepository,
    private readonly itemRepository: ItemRepository,
  ) {}

  async create(itemId: string, dto: CreateCustomizationDto) {
    const item = await this.itemRepository.findUnique(itemId);
    if (!item) throw new NotFoundException('Menu item not found');
    return this.customizationRepository.create(itemId, dto);
  }

  async findAll(itemId: string) {
    const item = await this.itemRepository.findUnique(itemId);
    if (!item) throw new NotFoundException('Menu item not found');
    return this.customizationRepository.findMany(itemId);
  }

  async remove(id: string) {
    const customization = await this.customizationRepository.findUnique(id);
    if (!customization) throw new NotFoundException('Customization not found');
    await this.customizationRepository.delete(id);
    return { message: 'Customization deleted' };
  }
}
