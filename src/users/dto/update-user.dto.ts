import { IsEmail, IsString, IsOptional, IsInt, IsEnum } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { LANGUAGES } from "../enum";

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  firstName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  lastName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  patronymic: string;

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
