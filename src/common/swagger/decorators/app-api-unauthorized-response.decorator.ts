import { applyDecorators } from "@nestjs/common";
import { ApiUnauthorizedResponse, ApiResponseOptions } from "@nestjs/swagger";

/**
 * Custom ApiUnauthorizedResponse decorator
 * @param message - The message to return
 * @param options - The options to pass to the ApiUnauthorizedResponse decorator
 * @returns The custom ApiUnauthorizedResponse decorator
 */

export const AppApiUnauthorizedResponse = (
  message = "Unauthorized",
  options: ApiResponseOptions = {
    schema: {
      type: "object",
      properties: {
        message: {
          type: "string",
          example: message,
        },
        statusCode: {
          type: "number",
          example: 401,
        },
      },
    },
  }
) => {
  return applyDecorators(ApiUnauthorizedResponse(options));
};
