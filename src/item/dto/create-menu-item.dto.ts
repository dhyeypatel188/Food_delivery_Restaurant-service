import { IsBoolean, IsInt, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateMenuItemDto {
  @IsUUID() category_id: string;
  @IsString() name: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsString() image_url?: string;
  @IsNumber() price: number;
  @IsOptional() @IsNumber() discounted_price?: number;
  @IsOptional() @IsBoolean() is_veg?: boolean;
  @IsOptional() @IsInt() preparation_time?: number;
  @IsOptional() @IsInt() calories?: number;
  @IsOptional() tags?: string[];
}
