import {
  Column,
  Table,
  AllowNull,
  Unique,
  IsEmail,
  BelongsToMany,
} from "sequelize-typescript";
import { RoleModel } from "../../roles/model/role.model";
import { UserRoleModel } from "./user-role.model";
import { AppModel } from "src/common/sequelize/models";
import { LANGUAGES } from "../enum";

@Table({
  tableName: "User",
})
export class UserModel extends AppModel<UserModel> {
  @AllowNull(false)
  @Unique
  @IsEmail
  @Column
  email: string;

  @Column
  passwordHash: string | null;

  @Column
  refreshToken: string | null;

  @Column
  firstName: string | null;

  @Column
  lastName: string | null;

  @Column
  patronymic: string | null;

  @Column({
    type: "enum",
    values: Object.values(LANGUAGES),
  })
  language: LANGUAGES;

  @BelongsToMany(() => RoleModel, () => UserRoleModel, "userId", "roleId")
  roles: RoleModel[];
}
