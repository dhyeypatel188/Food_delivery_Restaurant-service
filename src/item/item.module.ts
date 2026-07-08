import { Module } from '@nestjs/common';
import { ItemRepository } from './item.repository';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';

@Module({
  controllers: [ItemController],
  providers: [ItemService, ItemRepository],
  exports: [ItemRepository], // export it in case other modules need to find/verify items
})
export class ItemModule {}
