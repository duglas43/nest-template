import { Column, Table, BelongsToMany } from "sequelize-typescript";
import { UserModel, UserRoleModel } from "src/users/model";

import { AppModel } from "src/common/sequelize/models";

@Table({
  tableName: "Role",
})
export class RoleModel extends AppModel<RoleModel> {
  @Column
  name: string;

  @Column
  description: string;

  @BelongsToMany(() => UserModel, () => UserRoleModel, "roleId", "userId")
  users: UserModel[];
}
