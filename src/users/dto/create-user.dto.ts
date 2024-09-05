import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsEnum,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { LANGUAGES } from "../enum";

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  firstName: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  lastName: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  patronymic: string | null;

  @ApiPropertyOptional({ enum: LANGUAGES, enumName: "LANGUAGES" })
  @IsOptional()
  @IsEnum(LANGUAGES)
  language: LANGUAGES;

  @ApiPropertyOptional()
  @IsOptional()
  officeId: number | null;

  @ApiPropertyOptional({})
  @IsOptional()
  @IsInt({ each: true })
  roleIds: number[] | null;
}
