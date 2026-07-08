import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(restaurantId: string, dto: CreateReviewDto) {
    const review = await this.prisma.review.create({
      data: { restaurant_id: restaurantId, ...dto },
    });
    // Recalculate average rating
    const agg = await this.prisma.review.aggregate({
      where: { restaurant_id: restaurantId },
      _avg: { rating: true },
      _count: true,
    });
    await this.prisma.restaurant.update({
      where: { id: restaurantId },
      data: {
        avg_rating: agg._avg.rating ?? 0,
        total_ratings: agg._count,
      },
    });
    return review;
  }

  async findByRestaurant(restaurantId: string) {
    return this.prisma.review.findMany({
      where: { restaurant_id: restaurantId },
      orderBy: { created_at: 'desc' },
    });
  }

  async findById(id: string) {
    return this.prisma.review.findUnique({ where: { id } });
  }
}
