import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from "@nestjs/common";
import { SignInDto, SignUpDto, AccessDto, RefreshDto } from "./dto";
import { InjectModel } from "@nestjs/sequelize";
import { UserModel } from "../users/model/user.model";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel)
    private userEntity: typeof UserModel,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async signUp(dto: SignUpDto) {
    const candidate = await this.userEntity.findOne({
      where: { email: dto.email },
    });
    if (candidate) {
      throw new BadRequestException(
        `User with email ${dto.email} already exists`
      );
    }
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.userEntity.create({
      ...dto,
      passwordHash: hashPassword,
    });
    const refresh_token = await this.signRefreshToken({
      id: user.id,
      email: user.email,
    });
    await user.update({ refreshToken: refresh_token });
    const access_token = await this.signAccessToken({
      id: user.id,
      email: user.email,
    });
    return {
      access_token,
      refresh_token,
    };
  }

  async signIn(dto: SignInDto) {
    const user = await this.userEntity.findOne({
      where: { email: dto.email },
    });
    if (!user) {
      throw new ForbiddenException("Incorrect email or password");
    }
    const isCorrectPassword = bcrypt.compare(dto.password, user.passwordHash);
    if (!isCorrectPassword) {
      throw new ForbiddenException("Incorrect email or password");
    }
    const access_token = await this.signAccessToken({
      id: user.id,
      email: user.email,
    });
    const refresh_token = await this.signRefreshToken({
      id: user.id,
      email: user.email,
    });
    await user.update({ refreshToken: refresh_token });
    return {
      access_token,
      refresh_token,
    };
  }

  async refresh(dto: RefreshDto) {
    const user = await this.userEntity.findOne({
      where: { refreshToken: dto.refresh_token },
    });
    if (!user) {
      throw new ForbiddenException("Incorrect refresh token");
    }
    const access_token = await this.signAccessToken({
      id: user.id,
      email: user.email,
    });
    const refresh_token = await this.signRefreshToken({
      id: user.id,
      email: user.email,
    });
    await user.update({ refreshToken: refresh_token });
    return {
      access_token,
      refresh_token,
    };
  }

  async logout(userId: number) {
    const user = await this.userEntity.findByPkOrThrow(userId);
    await user.update({ refreshToken: null });
    return new AccessDto(null);
  }

  async signAccessToken(dto: { id: number; email: string }) {
    const payload = { email: dto.email, sub: dto.id };
    const secret = this.configService.get("JWT_ACCESS_TOKEN_SECRET");
    return this.jwtService.sign(payload, {
      expiresIn: "365d",
      secret,
    });
  }

  async signRefreshToken(dto: { id: number; email: string }) {
    const payload = { email: dto.email, sub: dto.id };
    const secret = this.configService.get("JWT_REFRESH_TOKEN_SECRET");
    return this.jwtService.sign(payload, {
      expiresIn: "365d",
      secret,
    });
  }
}
