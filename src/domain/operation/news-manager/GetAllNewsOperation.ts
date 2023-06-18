import { container } from "tsyringe";
import { UserAuthOperationTemplate } from "../../../infrestructure/template/UserAuthOperationTemplate";
import { OperationValidatorManager } from "../../../infrestructure/validator/managers/OperationValidatorManager";
import { TokenSession } from "../../model/TokenSession";
import { OperationNamesEnum } from "../../model/enum/OperationNamesEnum";
import { INewsEngineRepository } from "../../repository/INewsEngineRepository";
import { NewsCategory } from "../../model/NewsCategory";
import { INewsCategoryEngineRepository } from "../../repository/INewsCategoryEngineRepository";
import logger from "../../../infrestructure/config/logger";
import { Field } from "../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../infrestructure/response/enum/MiddlewareCustomMessage";
import { News } from "../../model/News";
import { NewsResultList } from "../../../application/model/news-manager/NewsResultList";
import { PageAndSizeParams } from "../../../application/model/PageAndSizeParams";
import { IPage } from "../../../infrestructure/pageable-manager/IPage";
import { InvalidParametersException } from "../../../infrestructure/exceptions/InvalidParametersException";


export class GetAllNewsOperation extends UserAuthOperationTemplate<NewsResultList, PageAndSizeParams>{

    private newsRepository: INewsEngineRepository;
    private newsCategoryRepository: INewsCategoryEngineRepository;
    private category: NewsCategory;

    constructor() {
        super(OperationNamesEnum.PORTAL_LIST_NEWS, OperationValidatorManager.getSingletonInstance())
        this.newsRepository = container.resolve<INewsEngineRepository>("INewsEngineRepository")
        this.newsCategoryRepository = container.resolve<INewsCategoryEngineRepository>("INewsCategoryEngineRepository")

    }

    protected async doValidateParameters(params: PageAndSizeParams): Promise<void> {

        if (params.getQueryParam) {
            this.category = await this.newsCategoryRepository.findNewsCategoryByCode(params.getQueryParam);
            logger.info("[GetAllNewsOperation] category founded", JSON.stringify(this.category))

            if (!this.category) {

                throw new InvalidParametersException(Field.NEWS, MiddlewareBusinessMessage.NEWS_CATEGORY_NOT_EXIST);
            }
        }

    }

    protected async doUserAuthExecuted(tokenSession: TokenSession, params: PageAndSizeParams, result: NewsResultList): Promise<void> {

    
        const newNews: IPage<News> = await this.newsRepository.findAllNews(params.getPage,
            params.size,
            this.category,
            params.orderColumn,
            params.direction);
        
        Object.assign(result,newNews);

    }

    protected initResult(): NewsResultList {
        return new NewsResultList()
    }

}

