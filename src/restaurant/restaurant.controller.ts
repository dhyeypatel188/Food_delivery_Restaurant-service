import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  findAll(
    @Query('city') city?: string,
    @Query('pincode') pincode?: string,
    @Query('customer_id') customer_id?: string,
    @Query('latitude') latitude?: string,
    @Query('longitude') longitude?: string,
  ) {
    const parsedLat = latitude ? parseFloat(latitude) : undefined;
    const parsedLng = longitude ? parseFloat(longitude) : undefined;
    const lat = parsedLat !== undefined && !isNaN(parsedLat) ? parsedLat : undefined;
    const lng = parsedLng !== undefined && !isNaN(parsedLng) ? parsedLng : undefined;

    return this.restaurantService.findAll({
      city,
      pincode,
      customer_id,
      latitude: lat,
      longitude: lng,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restaurantService.findOne(id);
  }

  @Get('owner/:ownerId')
  findByOwnerId(@Param('ownerId') ownerId: string) {
    return this.restaurantService.findByOwnerId(ownerId);
  }

  // owner_id should come from JWT in production; using header for now
  @Post()
  create(@Body() dto: CreateRestaurantDto, @Query('owner_id') owner_id: string) {
    return this.restaurantService.create(owner_id, dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRestaurantDto) {
    return this.restaurantService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantService.remove(id);
  }
}
