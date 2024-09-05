import { Model, ModelCtor } from "sequelize-typescript";
import { FindOptions, Identifier } from "sequelize/types";
import { NotFoundException } from "@nestjs/common";

export class AppModel<T extends Model<T>> extends Model<T, any> {
  constructor(...args: any[]) {
    super(...args);
  }
  static get modelName() {
    return this.getTableName();
  }
  static async findByPkOrThrow<T extends Model<T, any>>(
    this: ModelCtor<T>,
    id: Identifier,
    options?: FindOptions
  ): Promise<T> {
    const entity = await this.findByPk(id, options);
    if (!entity) {
      throw new NotFoundException(`${this.name} with id ${id} not found`);
    }
    return entity;
  }
}
