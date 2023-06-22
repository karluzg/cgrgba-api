import { container } from "tsyringe";
import { NewsCategoryResultList } from "../../../application/model/news-manager/NewsCategoryResultList";
import { UserAuthOperationTemplate } from "../../../infrestructure/template/UserAuthOperationTemplate";
import { PageAndSizeParams } from "../../../application/model/PageAndSizeParams";
import logger from "../../../infrestructure/config/logger";
import { IPage } from "../../../infrestructure/pageable-manager/IPage";
import { OperationValidatorManager } from "../../../infrestructure/validator/managers/OperationValidatorManager";
import { PermissionGroup } from "../../model/PermissionGroup";
import { TokenSession } from "../../model/TokenSession";
import { OperationNamesEnum } from "../../model/enum/OperationNamesEnum";
import { IPermissionGroupEngineRepository } from "../../repository/IPermissionGroupEngineRepository";
import { INewsCategoryEngineRepository } from "../../repository/INewsCategoryEngineRepository";
import { NewsCategory } from "../../model/NewsCategory";




export class GetAllNewsCategoryOperation extends UserAuthOperationTemplate<NewsCategoryResultList, PageAndSizeParams>{

    private newsCategoryRepository: INewsCategoryEngineRepository;

    constructor() {
        super(OperationNamesEnum.PORTAL_LIST_NEWS_CATEGORY, OperationValidatorManager.getSingletonInstance())
        this.newsCategoryRepository = container.resolve<INewsCategoryEngineRepository>("INewsCategoryEngineRepository")

    }


    protected async doUserAuthExecuted(tokenSession: TokenSession, params: PageAndSizeParams, result: NewsCategoryResultList): Promise<void> {


        logger.info("[GetAllNewsCategoryOperation] cretating news category")
        const newsCategory:IPage<NewsCategory> = await this.newsCategoryRepository.findAllNewsCategory(params.getPage, params.size,params.orderColumn,params.direction);
    
        Object.assign(result,newsCategory);

   
    }

    protected initResult(): NewsCategoryResultList {
        return new NewsCategoryResultList()
    }

}

