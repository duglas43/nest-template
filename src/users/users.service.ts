import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto, UpdateUserDto, UserDto, FindUsersDto } from "./dto";
import { InjectModel } from "@nestjs/sequelize";
import { UserModel } from "./model/user.model";
import { Op } from "sequelize";
import * as bcrypt from "bcrypt";
import { RoleDto } from "src/roles/dto";
import { ListResponseDto } from "src/common/dto";
import { ORDER } from "src/common/enum";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel)
    private userModel: typeof UserModel
  ) {}

  async create(dto: CreateUserDto) {
    const passwordHash = await bcrypt.hash(dto.password, 5);
    const createdUser = await this.userModel.create({
      ...dto,
      passwordHash,
    });
    if (dto.roleIds) {
      await createdUser.$set("roles", dto.roleIds);
    }
    const user = await this.userModel.findByPkOrThrow(createdUser.id);
    return new UserDto(user);
  }

  async findAll(dto: FindUsersDto) {
    const { rows, count } = await this.userModel.findAndCountAll({
      where: {
        [Op.and]: [
          dto.query && {
            [Op.or]: [
              { email: { [Op.like]: `%${dto.query}%` } },
              { firstName: { [Op.like]: `%${dto.query}%` } },
              { lastName: { [Op.like]: `%${dto.query}%` } },
              { patronymic: { [Op.like]: `%${dto.query}%` } },
            ],
          },
        ].filter(Boolean),
      },
      ...(dto.order && { order: [["id", dto.order]] }),
      ...(dto.sort && { order: [[dto.sort]] }),
      ...(dto.sort && dto.order && { order: [[dto.sort, dto.order]] }),
      ...(dto.limit && { limit: dto.limit }),
      ...(dto.page && { offset: dto.limit * dto.page }),
    });
    const response = new ListResponseDto<UserDto>(
      rows.map((user) => new UserDto(user)),
      {
        totalCount: count,
        pageCount: Math.ceil(count / dto.limit) || 1,
        resultCount: rows.length,
        page: dto.page || 1,
        limit: dto.limit || count,
        order: dto.order || ORDER.ASC,
        sort: dto.sort || "id",
      }
    );
    return response;
  }

  async findOne(id: number) {
    const user = await this.userModel.findByPkOrThrow(id);
    return new UserDto(user);
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.userModel.findByPkOrThrow(id);
    if (dto.roleIds) {
      await user.$set("roles", dto.roleIds);
    }
    await this.userModel.update(dto, { where: { id } });
    return new UserDto(user);
  }

  async remove(id: number) {
    const user = await this.userModel.findByPkOrThrow(id);
    await user.destroy();
    return new UserDto(user);
  }

  async getMe(id: number) {
    const user = await this.userModel.findByPkOrThrow(id);
    return new UserDto(user);
  }
  async addRoles(id: number, roleIds: number[]) {
    const user = await this.userModel.findByPkOrThrow(id);
    await user.$add("roles", roleIds);
    return new UserDto(user);
  }

  async removeRoles(id: number, roleIds: number[]) {
    const user = await this.userModel.findByPkOrThrow(id);
    await user.$remove("roles", roleIds);
    return new UserDto(user);
  }

  async findRoles(id: number) {
    const user = await this.userModel.findByPkOrThrow(id, {
      include: ["roles"],
    });
    return user.roles.map((role) => new RoleDto(role));
  }
}
