import { IsBoolean, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpsertHoursDto {
  @IsInt() @Min(0) @Max(6) day_of_week: number; // 0 = Sunday, 6 = Saturday
  @IsString() open_time: string;   // e.g. "09:00"
  @IsString() close_time: string;  // e.g. "22:00"
  @IsOptional() @IsBoolean() is_closed?: boolean;
}
