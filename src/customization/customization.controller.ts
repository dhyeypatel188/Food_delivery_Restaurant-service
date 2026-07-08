import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CustomizationService } from './customization.service';
import { CreateCustomizationDto } from './dto/create-customization.dto';

@Controller('items/:itemId/customizations')
export class CustomizationController {
  constructor(private readonly customizationService: CustomizationService) {}

  @Post()
  create(@Param('itemId') itemId: string, @Body() dto: CreateCustomizationDto) {
    return this.customizationService.create(itemId, dto);
  }

  @Get()
  findAll(@Param('itemId') itemId: string) {
    return this.customizationService.findAll(itemId);
  }

  @Delete(':customizationId')
  remove(@Param('customizationId') customizationId: string) {
    return this.customizationService.remove(customizationId);
  }
}
