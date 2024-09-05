import { Controller, Get } from "@nestjs/common";
import {
  HealthCheck,
  HealthCheckService,
  SequelizeHealthIndicator,
} from "@nestjs/terminus";
import { Public } from "src/auth/decorator";
import { ApiTags } from "@nestjs/swagger";

@Public()
@ApiTags("health")
@Controller("health")
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private readonly sequelize: SequelizeHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([() => this.sequelize.pingCheck("database")]);
  }
}
