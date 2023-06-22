import { container } from "tsyringe";
import { NewsCategoryParams } from "../../../application/model/news-manager/NewsCategoryParams";
import { NewsCategoryResult } from "../../../application/model/news-manager/NewsCategoryResult";
import logger from "../../../infrestructure/config/logger";
import { InvalidParametersException } from "../../../infrestructure/exceptions/InvalidParametersException";
import { Field } from "../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../infrestructure/response/enum/MiddlewareCustomMessage";
import { UserAuthOperationTemplate } from "../../../infrestructure/template/UserAuthOperationTemplate";
import { OperationValidatorManager } from "../../../infrestructure/validator/managers/OperationValidatorManager";
import { PermissionGroup } from "../../model/PermissionGroup";
import { TokenSession } from "../../model/TokenSession";
import { OperationNamesEnum } from "../../model/enum/OperationNamesEnum";
import { IPermissionGroupEngineRepository } from "../../repository/IPermissionGroupEngineRepository";
import { INewsCategoryEngineRepository } from "../../repository/INewsCategoryEngineRepository";
import { NewsCategory } from "../../model/NewsCategory";




export class AddNewsCategoryOperation extends UserAuthOperationTemplate<NewsCategoryResult, NewsCategoryParams>{

    private newsCategoryRepository: INewsCategoryEngineRepository;

    constructor() {
        super(OperationNamesEnum.PORTAL_ADD_NEWS_CATEGORY, OperationValidatorManager.getSingletonInstance())
        this.newsCategoryRepository = container.resolve<INewsCategoryEngineRepository>("INewsCategoryEngineRepository")
    }

    protected async doValidateParameters(params: NewsCategoryParams): Promise<void> {

        let newsCategory = await this.newsCategoryRepository.findNewsCategoryByCode(params.getCode)
        logger.info("[AddNewsCategoryOperation] NEWS CATEGORY founded", JSON.stringify(newsCategory))

        if (newsCategory) {
          
            throw new InvalidParametersException(Field.USER, MiddlewareBusinessMessage.NEWS_CATEGORY_ALREADY_EXIST);
        }
    }

    protected async doUserAuthExecuted(tokenSession: TokenSession, params: NewsCategoryParams, result: NewsCategoryResult): Promise<void> {


        const newsCategory = new NewsCategory(); // status is created automatically in user constructor
        newsCategory.code= params.getCode;
        newsCategory.description= params.getDescription;


        logger.info("[AddNewsCategoryOperation] creating NEWS CATEGORY in Data Base", JSON.stringify(newsCategory))
        try {
            const newNewsCategory: NewsCategory = await this.newsCategoryRepository.saveNewsCategory(newsCategory)
            result.setCategory = newNewsCategory;
        } catch (error) {
            console.log(error)
        }
     

    }

    protected initResult(): NewsCategoryResult {
        return new NewsCategoryResult()
    }

}

