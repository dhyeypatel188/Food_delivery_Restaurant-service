import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

export interface RestaurantFilterOptions {
  city?: string;
  pincode?: string;
  customer_id?: string;
  latitude?: number;
  longitude?: number;
}

@Injectable()
export class RestaurantRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(options: RestaurantFilterOptions = {}) {
    const { city, pincode, customer_id, latitude, longitude } = options;

    let cityFilter = city;
    let pincodeFilter = pincode;
    let latFilter = latitude;
    let lngFilter = longitude;

    // 1. If customer_id is provided, try to resolve their default address or first address
    if (customer_id) {
      const defaultAddress = await this.prisma.customer_Address.findFirst({
        where: { customer_id, is_default: true },
      }) || await this.prisma.customer_Address.findFirst({
        where: { customer_id },
      });

      if (defaultAddress) {
        cityFilter = defaultAddress.city;
        pincodeFilter = defaultAddress.pincode;
        if (defaultAddress.latitude !== null && defaultAddress.latitude !== undefined) {
          latFilter = defaultAddress.latitude;
        }
        if (defaultAddress.longitude !== null && defaultAddress.longitude !== undefined) {
          lngFilter = defaultAddress.longitude;
        }
      }
    }

    // 2. Query active and online restaurants matching city or pincode
    const restaurants = await this.prisma.restaurant.findMany({
      where: {
        status: 'ACTIVE',
        is_open: true,
        ...(cityFilter && {
          address: {
            city: {
              equals: cityFilter,
              mode: 'insensitive',
            },
          },
        }),
        ...(pincodeFilter && !cityFilter && {
          address: {
            pincode: pincodeFilter,
          },
        }),
      },
      include: { address: true },
    });

    // 3. If coordinate-based location is available, calculate distances and filter/sort
    if (latFilter !== undefined && lngFilter !== undefined) {
      const getDistanceKm = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
        const R = 6371; // Radius of the earth in km
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in km
      };

      const restaurantsWithDistance = restaurants.map((restaurant) => {
        const restAddress = restaurant.address;
        let distance: number | null = null;
        if (restAddress && restAddress.latitude !== null && restAddress.longitude !== null) {
          distance = getDistanceKm(
            latFilter!,
            lngFilter!,
            restAddress.latitude,
            restAddress.longitude
          );
        }
        return { ...restaurant, distance };
      });

      // Filter: only show restaurants within 15 km (or those with missing address coordinates to prevent blocking them)
      const maxDistanceKm = 15;
      const filtered = restaurantsWithDistance.filter(
        (r) => r.distance === null || r.distance <= maxDistanceKm
      );

      // Sort: closest first, followed by restaurants without coordinates
      filtered.sort((a, b) => {
        if (a.distance === null) return 1;
        if (b.distance === null) return -1;
        return a.distance - b.distance;
      });

      return filtered;
    }

    return restaurants;
  }

  async findUnique(id: string) {
    return this.prisma.restaurant.findUnique({
      where: { id },
      include: {
        address: true,
        categories: {
          include: { items: true }
        },
        operating_hours: true
      },
    });
  }

  async findByOwnerId(ownerId: string) {
    return this.prisma.restaurant.findUnique({
      where: { owner_id: ownerId },
      include: {
        address: true,
        categories: {
          include: { items: true }
        },
        operating_hours: true
      },
    });
  }

  async create(ownerId: string, dto: CreateRestaurantDto) {
    return this.prisma.restaurant.create({
      data: { 
        owner_id: ownerId, 
        status: 'ACTIVE',
        is_open: true,
        cover_image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
        ...dto 
      },
    });
  }

  async update(id: string, dto: UpdateRestaurantDto) {
    return this.prisma.restaurant.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: string) {
    return this.prisma.restaurant.delete({
      where: { id },
    });
  }
}
