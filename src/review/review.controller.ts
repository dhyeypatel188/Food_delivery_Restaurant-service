import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller()
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('restaurants/:restaurantId/reviews')
  create(@Param('restaurantId') restaurantId: string, @Body() dto: CreateReviewDto) {
    return this.reviewService.create(restaurantId, dto);
  }

  @Get('restaurants/:restaurantId/reviews')
  findByRestaurant(@Param('restaurantId') restaurantId: string) {
    return this.reviewService.getByRestaurant(restaurantId);
  }

  @Get('reviews/:reviewId')
  findOne(@Param('reviewId') reviewId: string) {
    return this.reviewService.getById(reviewId);
  }
}
