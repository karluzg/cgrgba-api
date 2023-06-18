import { container } from "tsyringe";
import { UserAuthOperationTemplate } from "../../../infrestructure/template/UserAuthOperationTemplate";
import { OperationValidatorManager } from "../../../infrestructure/validator/managers/OperationValidatorManager";
import { TokenSession } from "../../model/TokenSession";
import { OperationNamesEnum } from "../../model/enum/OperationNamesEnum";
import { NewsResult } from "../../../application/model/news-manager/NewsResult";
import { NewsParams } from "../../../application/model/news-manager/NewsParams";
import { INewsEngineRepository } from "../../repository/INewsEngineRepository";
import { NewsCategory } from "../../model/NewsCategory";
import { INewsCategoryEngineRepository } from "../../repository/INewsCategoryEngineRepository";
import logger from "../../../infrestructure/config/logger";
import { InvalidParametersException } from "../../../infrestructure/exceptions/InvalidParametersException";
import { NotFoundException } from "../../../infrestructure/exceptions/NotFoundExcecption";
import { Field } from "../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../infrestructure/response/enum/MiddlewareCustomMessage";
import { News } from "../../model/News";
import { ResultInfo } from "../../../infrestructure/response/ResultInfo";




export class AddNewsOperation extends UserAuthOperationTemplate<NewsResult, NewsParams>{

    private newsRepository: INewsEngineRepository;
    private newsCategoryRepository: INewsCategoryEngineRepository;
    private category: NewsCategory;

    constructor() {
        super(OperationNamesEnum.PORTAL_ADD_NEWS, OperationValidatorManager.getSingletonInstance())
        this.newsRepository = container.resolve<INewsEngineRepository>("INewsEngineRepository")
        this.newsCategoryRepository = container.resolve<INewsCategoryEngineRepository>("INewsCategoryEngineRepository")

    }

    protected async doValidateParameters(params: NewsParams): Promise<void> {

        this.category = await this.newsCategoryRepository.findNewsCategoryByCode(params.categoryCode);

        if (!this.category) {
            logger.error("[AddNewsOperation] categoria invalida")
            throw new NotFoundException(Field.NEWS, MiddlewareBusinessMessage.NEWS_CATEGORY_NOT_EXIST);
        }

        const news = await this.newsRepository.findNewsByTitle(params.title);

        if (news) {
            logger.error("[AddNewsOperation] notifcia com titulo % existe", news.title)
            throw new InvalidParametersException(Field.NEWS, MiddlewareBusinessMessage.NEWS_INVALID_TITLE);
        }
    }

    protected async doUserAuthExecuted(tokenSession: TokenSession, params: NewsParams, result: NewsResult): Promise<void> {


        const news = new News();
        news.title = params.title;
        news.message = params.message;
        news.newsCategory = this.category;
        news.status = false;


        logger.info("[AddUserOperation] creating news in db %", JSON.stringify(news))
        const newNews = await this.newsRepository.saveNews(news);
        result.setNews = newNews;

        //this.message.set(Field.INFO, new ResultInfo(MiddlewareBusinessMessage.NEWS_ADD_SUCCESSFULLY));
        //result.setStatus = Object.fromEntries(this.message)

    }

    protected initResult(): NewsResult {
        return new NewsResult()
    }

}

