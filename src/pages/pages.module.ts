import { Module } from "@nestjs/common";
import { PagesService } from "./pages.service";
import { PagesController } from "./pages.controller";
import { PageModel } from "./model";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  imports: [SequelizeModule.forFeature([PageModel])],
  controllers: [PagesController],
  providers: [PagesService],
})
export class PagesModule {}
