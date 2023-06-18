import { container } from "tsyringe";
import { UserAuthOperationTemplate } from "../../../infrestructure/template/UserAuthOperationTemplate";
import { OperationValidatorManager } from "../../../infrestructure/validator/managers/OperationValidatorManager";
import { TokenSession } from "../../model/TokenSession";
import { OperationNamesEnum } from "../../model/enum/OperationNamesEnum";
import { NewsResult } from "../../../application/model/news-manager/NewsResult";
import { INewsEngineRepository } from "../../repository/INewsEngineRepository";
import { NewsCategory } from "../../model/NewsCategory";
import { INewsCategoryEngineRepository } from "../../repository/INewsCategoryEngineRepository";
import logger from "../../../infrestructure/config/logger";
import { Field } from "../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../infrestructure/response/enum/MiddlewareCustomMessage";
import { NewsFileParams } from "../../../application/model/news-manager/NewsFileParams";
import { InvalidParametersException } from "../../../infrestructure/exceptions/InvalidParametersException";




export class AddNewsFileOperation extends UserAuthOperationTemplate<NewsResult, NewsFileParams>{

    private newsRepository: INewsEngineRepository;
    private newsCategoryRepository: INewsCategoryEngineRepository;
    private category: NewsCategory;

    constructor() {
        super(OperationNamesEnum.PORTAL_ADD_FILE, OperationValidatorManager.getSingletonInstance())
        this.newsRepository = container.resolve<INewsEngineRepository>("INewsEngineRepository")
        this.newsCategoryRepository = container.resolve<INewsCategoryEngineRepository>("INewsCategoryEngineRepository")

    }

    protected async doValidateParameters(params: NewsFileParams): Promise<void> {

        const news = await this.newsRepository.findNewsById(params.id);

        if (!news) {
            logger.error("[AddNewsFileOperation] notifcia não existe % existe", params.id)
            throw new InvalidParametersException(Field.NEWS, MiddlewareBusinessMessage.NEWS_INVALID_TITLE);
        }
    }

    protected async doUserAuthExecuted(tokenSession: TokenSession, params: NewsFileParams, result: NewsResult): Promise<void> {

        logger.info("[AddNewsFileOperation] Update Nues file Path ")
        const newNews = await this.newsRepository.uploadImageNews(params.id,params.filepath);
        result.setNews = newNews;

        //this.message.set(Field.INFO, new ResultInfo(MiddlewareBusinessMessage.NEWS_FILE_ADD_SUCCESSFULLY));
       // result.setStatus = Object.fromEntries(this.message)

    }

    protected initResult(): NewsResult {
        return new NewsResult()
    }

}

