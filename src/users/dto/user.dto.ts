import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { LANGUAGES } from "../enum";
import { RoleDto } from "src/roles/dto";

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ uniqueItems: true })
  email: string;

  @ApiPropertyOptional({ nullable: true })
  firstName: string | null;

  @ApiPropertyOptional({ nullable: true })
  lastName: string | null;

  @ApiPropertyOptional({ nullable: true })
  patronymic: string | null;

  @ApiProperty({ enum: LANGUAGES, enumName: "LANGUAGES" })
  language: LANGUAGES;

  @ApiProperty({ nullable: true })
  officeId: number | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date | null;

  @ApiProperty()
  roles: RoleDto[];

  constructor(model: any) {
    this.id = model?.id;
    this.email = model?.email;
    this.firstName = model?.firstName;
    this.lastName = model?.lastName;
    this.patronymic = model?.patronymic;
    this.language = model?.language;
    this.officeId = model?.officeId;
    this.createdAt = model?.createdAt;
    this.updatedAt = model?.updatedAt;
    this.roles = model?.roles;
  }
}
