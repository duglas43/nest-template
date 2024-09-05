import { applyDecorators, Type } from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";
import { MetaDto } from "src/common/dto";

export const ApiListResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiExtraModels(model),
    ApiExtraModels(MetaDto),
    ApiOkResponse({
      schema: {
        properties: {
          content: {
            type: "array",
            items: { $ref: getSchemaPath(model) },
          },
          meta: {
            $ref: getSchemaPath(MetaDto),
          },
        },
      },
    })
  );
};
