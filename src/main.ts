import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import helmet from "helmet";
import * as cookieParser from "cookie-parser";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { Logger, LoggerErrorInterceptor } from "nestjs-pino";
const signalsNames: NodeJS.Signals[] = ["SIGTERM", "SIGINT", "SIGHUP"];

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: configService.get("CLIENT_URLS").split(","),
    credentials: true,
  });
  app.use(helmet());
  app.use(cookieParser());
  const logger = app.get(Logger);
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  );

  if (configService.get("NODE_ENV") === "development") {
    const config = new DocumentBuilder()
      .setTitle("Thesis backend API")
      .addBearerAuth({
        description: `
          Admin: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwic3ViIjoxLCJpYXQiOjE3MDg5MjYwMTYsImV4cCI6MTc0MDQ2MjAxNn0.p4RA6eQil7wmC_z9ktTPiddCJot-KP_IDdjzcsZTX9U
          Engineer: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVuZ2luZWVyQG1haWwuY29tIiwic3ViIjoyLCJpYXQiOjE3MDg5MjYwMTYsImV4cCI6MTc0MDQ2MjAxNn0.PEzmsn9CITTUcctyIWV19aI4DFoewD2zbiUi2FFOd0s
          Client: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNsaWVudEBtYWlsLmNvbSIsInN1YiI6MywiaWF0IjoxNzA4OTI2MDE2LCJleHAiOjE3NDA0NjIwMTZ9.lqqWxtzV0y1H-AlgvzunPmBTHVvaboNK1LaXmrCUdfs
          HR: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhyQG1haWwuY29tIiwic3ViIjo0LCJpYXQiOjE3MDg5MjYwMTYsImV4cCI6MTc0MDQ2MjAxNn0.3Zq5eyFV_SyFmnD6tkPTLRNbJKCAoy8S8YNLQsI-COc
          Client Manager: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbmFnZXJAbWFpbC5jb20iLCJzdWIiOjUsImlhdCI6MTcwODkyNjAxNiwiZXhwIjoxNzQwNDYyMDE2fQ.z2M4iZtXrEN7KdO6uv69Atp4ufvHotJ9VnTHWKIENpw
          Office Manager 1: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9mZmljZS1tYW5hZ2VyLTFAbWFpbC5jb20iLCJzdWIiOjYsImlhdCI6MTcxMTI4MDMwMSwiZXhwIjoxNzQyODE2MzAxfQ.ACGQ_3p1MJlCJt2YFAPGxXcim6PMs0c1EpWQJGRAq0Y
          Office Manager 2: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9mZmljZS1tYW5hZ2VyLTJAbWFpbC5jb20iLCJzdWIiOjcsImlhdCI6MTcxMTI4MDMzNSwiZXhwIjoxNzQyODE2MzM1fQ.Yxwo_kUiFQeS5PhNxtPHBhxlzGSfEUtQIwYTAawyl5s
          `,
        type: "http",
      })
      .build();
    const document = SwaggerModule.createDocument(app, config);
    app.use("/api/docs.json", (req, res) => {
      return res.send(document);
    });
    SwaggerModule.setup("api", app, document);
  }
  if (configService.get("NODE_ENV") === "production") {
    app.useLogger(logger);
    signalsNames.forEach((signalName) =>
      process.on(signalName, (signal) => {
        logger.log(`Retrieved signal: ${signal}, application terminated`);
        process.exit(0);
      })
    );

    process.on("uncaughtException", (error: Error) => {
      logger.error({ err: error });
      process.exit(1);
    });

    process.on("unhandledRejection", (reason, promise) => {
      logger.error(`Unhandled Promise Rejection, reason: ${reason}`);
      promise.catch((err: Error) => {
        logger.error({ err });
        process.exit(1);
      });
    });
  }
  await app.listen(configService.get("APP_PORT"));
}
bootstrap();
