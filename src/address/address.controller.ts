import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateRestaurantAddressDto } from './dto/create-address.dto';

@Controller('restaurants/:restaurantId/address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  findOne(@Param('restaurantId') restaurantId: string) {
    return this.addressService.getAddress(restaurantId);
  }

  @Post()
  create(@Param('restaurantId') restaurantId: string, @Body() dto: CreateRestaurantAddressDto) {
    return this.addressService.createAddress(restaurantId, dto);
  }

  @Patch()
  update(
    @Param('restaurantId') restaurantId: string,
    @Body() dto: Partial<CreateRestaurantAddressDto>,
  ) {
    return this.addressService.updateAddress(restaurantId, dto);
  }
}
