import { Injectable } from "@nestjs/common";
import { CreatePageDto, UpdatePageDto, PageDto, FindPageDto } from "./dto";
import { PageModel } from "./model/page.model";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";

@Injectable()
export class PagesService {
  constructor(
    @InjectModel(PageModel)
    private pageModel: typeof PageModel
  ) {}

  async create(dto: CreatePageDto) {
    const page = await this.pageModel.create({ ...dto });
    return new PageDto(page);
  }

  async findAll(dto: FindPageDto) {
    const pages = await this.pageModel.findAll({
      where: {
        ...(dto.query && {
          [Op.or]: [{ name: { [Op.like]: `%${dto.query}%` } }],
        }),
      },
    });
    return pages.map((page) => new PageDto(page));
  }

  async findOne(id: number) {
    const page = await this.pageModel.findByPkOrThrow(id);
    return new PageDto(page);
  }

  async update(id: number, dto: UpdatePageDto) {
    const page = await this.pageModel.findByPkOrThrow(id);
    await page.update(dto);
    return new PageDto(page);
  }

  async remove(id: number) {
    const page = await this.pageModel.findByPkOrThrow(id);
    await page.destroy();
    return new PageDto(page);
  }
}
