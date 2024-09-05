import { IsString, IsOptional, IsEnum, IsInt } from "class-validator";
import { Transform } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ORDER } from "src/common/enum";

export class FindRoleDto {
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
