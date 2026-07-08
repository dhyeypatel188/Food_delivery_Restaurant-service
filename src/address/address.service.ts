import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { AddressRepository } from './address.repository';
import { CreateRestaurantAddressDto } from './dto/create-address.dto';

@Injectable()
export class AddressService {
  constructor(private readonly addressRepository: AddressRepository) {}

  async getAddress(restaurantId: string) {
    const address = await this.addressRepository.findByRestaurant(restaurantId);
    if (!address) throw new NotFoundException('Address not found');
    return address;
  }

  async createAddress(restaurantId: string, dto: CreateRestaurantAddressDto) {
    const existing = await this.addressRepository.findByRestaurant(restaurantId);
    if (existing) throw new ConflictException('Address already exists. Use PATCH to update.');
    return this.addressRepository.create(restaurantId, dto);
  }

  async updateAddress(restaurantId: string, dto: Partial<CreateRestaurantAddressDto>) {
    await this.getAddress(restaurantId);
    return this.addressRepository.update(restaurantId, dto);
  }
}
