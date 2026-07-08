import { IsBoolean, IsInt, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateMenuItemDto {
  @IsOptional() @IsUUID() category_id?: string;
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsString() image_url?: string;
  @IsOptional() @IsNumber() price?: number;
  @IsOptional() @IsNumber() discounted_price?: number;
  @IsOptional() @IsBoolean() is_veg?: boolean;
  @IsOptional() @IsBoolean() is_available?: boolean;
  @IsOptional() @IsInt() preparation_time?: number;
  @IsOptional() @IsInt() calories?: number;
  @IsOptional() tags?: string[];
}
