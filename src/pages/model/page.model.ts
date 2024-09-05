import { Column, Table } from "sequelize-typescript";
import { AppModel } from "src/common/sequelize/models";

@Table({
  tableName: "Page",
})
export class PageModel extends AppModel<PageModel> {
  @Column
  name: string;
}
