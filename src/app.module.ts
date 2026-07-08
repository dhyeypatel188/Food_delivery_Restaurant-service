import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { CategoryModule } from './category/category.module';
import { ItemModule } from './item/item.module';
import { CustomizationModule } from './customization/customization.module';
import { HoursModule } from './hours/hours.module';
import { AddressModule } from './address/address.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    RestaurantModule,
    CategoryModule,
    ItemModule,
    CustomizationModule,
    HoursModule,
    AddressModule,
    ReviewModule,
  ],
})
export class AppModule {}
