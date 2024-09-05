import { Module } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { RolesController } from "./roles.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { RoleModel } from "./model/role.model";

@Module({
  imports: [SequelizeModule.forFeature([RoleModel])],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
