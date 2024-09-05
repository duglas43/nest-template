import { ORDER } from "src/common/enum";
import { IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class FindUsersDto {
  @ApiProperty()
  @IsString()
  readonly query: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly sort: string;

  @ApiPropertyOptional({ enum: ORDER, enumName: "ORDER" })
  @IsOptional()
  @IsEnum(ORDER)
  readonly order: ORDER;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => parseInt(value) || null)
  @IsInt()
  readonly limit: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => parseInt(value) || null)
  @IsInt()
  readonly page: number;
}
