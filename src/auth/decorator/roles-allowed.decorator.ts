import { Reflector } from "@nestjs/core";
import { ROLES } from "src/roles/enum";

export const RolesAllowed = Reflector.createDecorator<ROLES[]>();
