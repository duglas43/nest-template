import { applyDecorators } from "@nestjs/common";
import { ApiResponseOptions, ApiForbiddenResponse } from "@nestjs/swagger";

/**
 * Custom ApiForbiddenResponse decorator
 * @param message - The message to return
 * @param options - The options to pass to the ApiForbiddenResponse decorator
 * @returns The custom ApiForbiddenResponse decorator
 */

export const AppApiForbiddenResponse = (
  message = "Forbidden resource",
  options: ApiResponseOptions = {
    schema: {
      type: "object",
      properties: {
        message: {
          type: "string",
          example: message,
        },
        error: {
          type: "string",
          example: "Forbidden",
        },
        statusCode: {
          type: "number",
          example: 403,
        },
      },
    },
  }
) => {
  return applyDecorators(ApiForbiddenResponse(options));
};
