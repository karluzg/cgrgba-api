import { ApiProperty } from "@nestjs/swagger";
import { News } from "../../../domain/model/News";
import { ResultTemplate } from "../../../infrestructure/template/ResultTemplate";
import { IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { PageableResult } from "../../../infrestructure/pageable-manager/PageableResult";

export class NewsResultList extends PageableResult<News> {

}
