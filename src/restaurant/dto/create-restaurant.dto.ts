import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRestaurantDto {
  @IsString() name: string;
  @IsOptional() @IsString() description?: string;
  @IsString() phone: string;
  @IsEmail() email: string;
  @IsNumber() estimated_time: number;
  @IsOptional() @IsNumber() min_order_amount?: number;
  @IsOptional() @IsNumber() delivery_fee?: number;
}
