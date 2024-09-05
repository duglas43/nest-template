import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Query,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { PagesService } from "./pages.service";
import { PageDto, CreatePageDto, UpdatePageDto, FindPageDto } from "./dto";
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import {
  AppApiUnauthorizedResponse,
  AppApiNotFoundResponse,
  AppApiForbiddenResponse,
} from "src/common/swagger/decorators";

@ApiBearerAuth()
@AppApiUnauthorizedResponse()
@AppApiForbiddenResponse()
@AppApiNotFoundResponse()
@ApiTags("pages")
@Controller("pages")
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Post()
  @ApiCreatedResponse({ type: PageDto })
  create(@Body() createPageDto: CreatePageDto) {
    return this.pagesService.create(createPageDto);
  }

  @Get()
  @ApiOkResponse({ type: [PageDto] })
  findAll(@Query() findPageDto: FindPageDto) {
    return this.pagesService.findAll(findPageDto);
  }

  @Get(":id")
  @ApiOkResponse({ type: PageDto })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.pagesService.findOne(id);
  }

  @Patch(":id")
  @ApiOkResponse({ type: PageDto })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updatePageDto: UpdatePageDto
  ) {
    return this.pagesService.update(id, updatePageDto);
  }

  @Delete(":id")
  @ApiOkResponse({ type: PageDto })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.pagesService.remove(id);
  }
}
