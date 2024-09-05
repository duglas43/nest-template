import { applyDecorators } from "@nestjs/common";
import { ApiResponseOptions, ApiBody } from "@nestjs/swagger";

/**
 * Custom ApiArrayBodyParam decorator
 * @param key - The key of the parameter
 * @param type - The type of the parameter
 * @param options - The options to pass to the ApiBody decorator
 * @returns The custom ApiBody decorator
 */

export const AppApiArrayBodyParam = (
  key: string,
  type: string,
  options: ApiResponseOptions = {
    schema: {
      properties: {
        [key]: {
          type: "array",
          items: {
            type,
          },
        },
      },
    },
  }
) => {
  return applyDecorators(ApiBody(options));
};
