import { ApiProperty } from "@nestjs/swagger";
import { ORDER } from "../enum";
export class MetaDto {
  @ApiProperty()
  totalCount: number; // total number of items
  @ApiProperty()
  pageCount: number; // total number of pages
  @ApiProperty()
  resultCount: number; // number of items in current page
  @ApiProperty()
  page: number; // current page
  @ApiProperty()
  limit: number;
  @ApiProperty({ enum: ORDER, enumName: "ORDER" })
  order: ORDER;
  @ApiProperty()
  sort: string;
}
