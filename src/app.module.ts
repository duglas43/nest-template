import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { AppController } from "./app.controller";
import { ConfigModule } from "@nestjs/config";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { RolesModule } from "./roles/roles.module";
import { AuthModule } from "./auth/auth.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { RolesGuard } from "src/auth/guard";
import { JwtAuthGuard } from "./auth/guard";
import { UserModel } from "./users/model/user.model";
import { RoleModel } from "./roles/model/role.model";
import { UserRoleModel } from "./users/model";
import { ExceptionFiltersModule } from "./common/exception-filters/exception-filters.module";
import { LoggerModule } from "./common/logger/logger.module";
import { MulterConfigModule } from "./common/multer-config/multer-config.module";
import { PipesModule } from "./common/pipes/pipes.module";
import { HealthModule } from "./health/health.module";
import { PageModel } from "./pages/model";
import { PagesModule } from "./pages/pages.module";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    RolesModule,
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: process.env.DB_DIALECT as any,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS || null,
      database: process.env.DB_NAME,
      define: {
        freezeTableName: true,
      },
      models: [UserModel, RoleModel, UserRoleModel, PageModel],
    }),
    LoggerModule,
    MulterConfigModule,
    PipesModule,
    ExceptionFiltersModule,
    PagesModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AppService,
  ],
})
export class AppModule {}
