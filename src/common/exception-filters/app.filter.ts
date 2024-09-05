import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from "@nestjs/common";
import { Request, Response } from "express";
import { ForbiddenError } from "@casl/ability";

@Catch()
export class AppFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const message = exception.getResponse();
      response.status(status).json({
        ...(message instanceof Object ? message : { message }),
      });
      return;
    }
    if (exception instanceof ForbiddenError) {
      response.status(403).json({
        statusCode: 403,
        message: exception.message,
      });
      return;
    }

    response.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
      error: "Internal Server Error",
    });
    console.error(exception);
  }
}
