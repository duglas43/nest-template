import { ApiProperty } from '@nestjs/swagger';
import { MetaDto } from './meta.dto';

export class ListResponseDto<T> {
  @ApiProperty()
  content: T[];
  @ApiProperty()
  meta: MetaDto;
  constructor(content: T[], meta: MetaDto) {
    this.content = content;
    this.meta = meta;
  }
}
