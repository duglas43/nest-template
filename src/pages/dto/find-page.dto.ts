import { IsString, IsOptional } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class FindPageDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly query: string;
}
