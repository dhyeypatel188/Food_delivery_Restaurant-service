import { IsBoolean, IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateRestaurantDto {
  @IsOptional() @IsString()  name?: string;
  @IsOptional() @IsString()  description?: string;
  @IsOptional() @IsString()  cover_image?: string;
  @IsOptional() @IsString()  logo?: string;
  @IsOptional() @IsString()  phone?: string;
  @IsOptional() @IsEmail()   email?: string;
  @IsOptional() @IsBoolean() is_open?: boolean;
  @IsOptional() @IsNumber()  estimated_time?: number;
  @IsOptional() @IsNumber()  min_order_amount?: number;
  @IsOptional() @IsNumber()  delivery_fee?: number;
}
