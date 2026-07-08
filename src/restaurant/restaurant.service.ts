import { Injectable, NotFoundException } from '@nestjs/common';
import { RestaurantRepository, RestaurantFilterOptions } from './restaurant.repository';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(private readonly restaurantRepository: RestaurantRepository) {}

  async findAll(options?: RestaurantFilterOptions) {
    return this.restaurantRepository.findMany(options);
  }

  async findOne(id: string) {
    const restaurant = await this.restaurantRepository.findUnique(id);
    if (!restaurant) throw new NotFoundException('Restaurant not found');
    return restaurant;
  }

  async findByOwnerId(ownerId: string) {
    const restaurant = await this.restaurantRepository.findByOwnerId(ownerId);
    if (!restaurant) throw new NotFoundException('Restaurant not found');
    return restaurant;
  }

  async create(owner_id: string, dto: CreateRestaurantDto) {
    return this.restaurantRepository.create(owner_id, dto);
  }

  async update(id: string, dto: UpdateRestaurantDto) {
    await this.findOne(id);
    return this.restaurantRepository.update(id, dto);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.restaurantRepository.delete(id);
    return { message: 'Restaurant deleted' };
  }
}
