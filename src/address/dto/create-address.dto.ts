import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRestaurantAddressDto {
  @IsString() address_line1: string;
  @IsOptional() @IsString() address_line2?: string;
  @IsString() city: string;
  @IsString() state: string;
  @IsString() pincode: string;
  @IsNumber() latitude: number;
  @IsNumber() longitude: number;
}
