import { container } from "tsyringe";
import { UserAuthOperationTemplate } from "../../../infrestructure/template/UserAuthOperationTemplate";
import { OperationValidatorManager } from "../../../infrestructure/validator/managers/OperationValidatorManager";
import { TokenSession } from "../../model/TokenSession";
import { OperationNamesEnum } from "../../model/enum/OperationNamesEnum";
import { IUserEngineRepository } from "../../repository/IUserEngineRepository";
import { NewsResult } from "../../../application/model/news-manager/NewsResult";
import { NewsParams } from "../../../application/model/news-manager/NewsParams";
import { INewsEngineRepository } from "../../repository/INewsEngineRepository";
import { NewsCategory } from "../../model/NewsCategory";
import { INewsCategoryEngineRepository } from "../../repository/INewsCategoryEngineRepository";
import logger from "../../../infrestructure/config/logger";
import { InvalidParametersException } from "../../../infrestructure/exceptions/InvalidParametersException";
import { NotFoundException } from "../../../infrestructure/exceptions/NotFoundExcecption";
import { Field } from "../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../infrestructure/response/enum/MiddlewareCustomErrorMessage";
import { News } from "../../model/News";
import { ResultInfo } from "../../../infrestructure/response/ResultInfo";
import { NewsResultList } from "../../../application/model/news-manager/NewsResultList";
import { PageAndSizeParams } from "../../../application/model/PageAndSizeParams";
import { IPage } from "../../../infrestructure/pageable-manager/IPage";
import { PageUtil } from "../util/PageUtil";
import { PageableUtils } from "../../../infrestructure/pageable-manager/PageableUtils";




export class GetAllNewsOperation extends UserAuthOperationTemplate<NewsResultList, PageAndSizeParams>{

    private newsRepository: INewsEngineRepository;
    private newsCategoryRepository: INewsCategoryEngineRepository;
    private category: NewsCategory;

    constructor() {
        super(OperationNamesEnum.USER_CREATE, OperationValidatorManager.getSingletonInstance())
        this.newsRepository = container.resolve<INewsEngineRepository>("INewsEngineRepository")
        this.newsCategoryRepository = container.resolve<INewsCategoryEngineRepository>("INewsCategoryEngineRepository")

    }

    protected async doValidateParameters(params: PageAndSizeParams): Promise<void> {

        if (params.getQueryParam) {
            this.category = await this.newsCategoryRepository.findNewsCategoryByCode(params.getQueryParam);

            if (!this.category) {
                logger.error("[GetAllNewsOperation] categoria invalida")
                throw new NotFoundException(Field.NEWS, MiddlewareBusinessMessage.NEWS_CATEGORY_NOT_FOUND);
            }
        }

    }

    protected async doUserAuthExecuted(tokenSession: TokenSession, params: PageAndSizeParams, result: NewsResultList): Promise<void> {


        logger.info("[GetAllNewsOperation] creating allnews")
        const newNews:IPage<News> = await this.newsRepository.findAllNews(params.getPage, params.size,this.category,params.orderColumn,params.direction);
        //PageableUtils.ofWithoutContent(result, newNews)

        Object.assign(result,newNews);

        this.message.set(Field.INFO, new ResultInfo(MiddlewareBusinessMessage.NEWS_GET_ALL_SUCCESSFULLY));
        result.setStatus = Object.fromEntries(this.message)

    }

    protected initResult(): NewsResultList {
        return new NewsResultList()
    }

}

