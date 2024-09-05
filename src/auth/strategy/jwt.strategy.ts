import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { UserModel } from "src/users/model/user.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    @InjectModel(UserModel)
    private userEntity: typeof UserModel,
    configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get("JWT_ACCESS_TOKEN_SECRET"),
    });
  }
  async validate(payload: { sub: number; email: string }) {
    const user = await this.userEntity.findOne({
      where: { id: payload.sub },
      include: ["roles"],
    });
    return user;
  }
}
