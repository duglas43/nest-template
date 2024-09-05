import { Model, Table } from "sequelize-typescript";
import { AppModel } from "src/common/sequelize/models";

@Table({
  tableName: "UserRole",
})
export class UserRoleModel extends AppModel<UserRoleModel> {}
