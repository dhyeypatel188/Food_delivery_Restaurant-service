import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRestaurantAddressDto } from './dto/create-address.dto';

@Injectable()
export class AddressRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByRestaurant(restaurantId: string) {
    return this.prisma.restaurant_Address.findUnique({
      where: { restaurant_id: restaurantId },
    });
  }

  async create(restaurantId: string, dto: CreateRestaurantAddressDto) {
    return this.prisma.restaurant_Address.create({
      data: { restaurant_id: restaurantId, ...dto },
    });
  }

  async update(restaurantId: string, dto: Partial<CreateRestaurantAddressDto>) {
    return this.prisma.restaurant_Address.update({
      where: { restaurant_id: restaurantId },
      data: dto,
    });
  }
}
