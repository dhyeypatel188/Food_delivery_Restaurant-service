import { IsBoolean, IsInt, IsNumber, IsOptional, IsString, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

class CustomizationOptionDto {
  @IsString() name: string;
  @IsOptional() @IsNumber() additional_price?: number;
}

export class CreateCustomizationDto {
  @IsString() group_name: string;
  @IsOptional() @IsBoolean() is_required?: boolean;
  @IsOptional() @IsInt() max_select?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CustomizationOptionDto)
  options: CustomizationOptionDto[];
}
