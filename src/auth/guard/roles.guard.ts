import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserModel } from "src/users/model/user.model";
import { RolesAllowed } from "src/auth/decorator";
import { IS_PUBLIC_KEY } from "../decorator/public.decorator";
import { ROLES } from "src/roles/enum";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get(RolesAllowed, context.getHandler());
    if (!roles) {
      return true;
    }
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user as UserModel;
    if (!user) {
      return false;
    }
    const userRoles = await user.$get("roles");
    return userRoles.some((role) => roles.includes(role.name as ROLES));
  }
}
