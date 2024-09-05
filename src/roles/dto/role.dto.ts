import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RoleDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date | null;

  constructor(model: Partial<RoleDto>) {
    this.id = model?.id;
    this.name = model?.name;
    this.description = model?.description;
    this.createdAt = model?.createdAt;
    this.updatedAt = model?.updatedAt;
  }
}
