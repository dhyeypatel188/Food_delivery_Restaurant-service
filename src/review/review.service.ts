import { Injectable, NotFoundException } from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async create(restaurantId: string, dto: CreateReviewDto) {
    return this.reviewRepository.create(restaurantId, dto);
  }

  async getByRestaurant(restaurantId: string) {
    return this.reviewRepository.findByRestaurant(restaurantId);
  }

  async getById(id: string) {
    const review = await this.reviewRepository.findById(id);
    if (!review) throw new NotFoundException('Review not found');
    return review;
  }
}
