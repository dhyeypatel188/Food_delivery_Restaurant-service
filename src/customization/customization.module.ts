import { Module } from '@nestjs/common';
import { CustomizationRepository } from './customization.repository';
import { CustomizationService } from './customization.service';
import { CustomizationController } from './customization.controller';
import { ItemModule } from '../item/item.module';

@Module({
  imports: [ItemModule],
  controllers: [CustomizationController],
  providers: [CustomizationService, CustomizationRepository],
})
export class CustomizationModule {}
