import { applyDecorators } from '@nestjs/common';
import { ApiResponseOptions, ApiNotFoundResponse } from '@nestjs/swagger';

/**
 * Custom ApiNotFoundResponse decorator
 * @param message - The message to return
 * @param options - The options to pass to the ApiNotFoundResponse decorator
 * @returns The custom ApiNotFoundResponse decorator
 */

export const AppApiNotFoundResponse = (
  message = 'Not found',
  options: ApiResponseOptions = {
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: message,
        },
        statusCode: {
          type: 'number',
          example: 404,
        },
      },
    },
  },
) => {
  return applyDecorators(ApiNotFoundResponse(options));
};
