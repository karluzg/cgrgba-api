import { container } from "tsyringe";
import { UserAuthOperationTemplate } from "../../../../infrestructure/template/UserAuthOperationTemplate";
import { OperationValidatorManager } from "../../../../infrestructure/validator/managers/OperationValidatorManager";
import { TokenSession } from "../../../model/TokenSession";
import { OperationNamesEnum } from "../../../model/enum/OperationNamesEnum";
import { INewsEngineRepository } from "../../../repository/INewsEngineRepository";
import { NewsCategory } from "../../../model/NewsCategory";
import { INewsCategoryEngineRepository } from "../../../repository/INewsCategoryEngineRepository";
import logger from "../../../../infrestructure/config/logger";
import { NotFoundException } from "../../../../infrestructure/exceptions/NotFoundExcecption";
import { Field } from "../../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../../infrestructure/response/enum/MiddlewareCustomErrorMessage";
import { News } from "../../../model/News";
import { ResultInfo } from "../../../../infrestructure/response/ResultInfo";
import { NewsResultList } from "../../../../application/model/news-manager/NewsResultList";
import { PageAndSizeParams } from "../../../../application/model/PageAndSizeParams";
import { IPage } from "../../../../infrestructure/pageable-manager/IPage";
import { UserResultList } from "../../../../application/model/user-manager/UserResultList";
import { IUserEngineRepository } from "../../../repository/IUserEngineRepository";
import { IUserStatusEngineRepository } from "../../../repository/IUserStatusEngineRepository";
import { UserStatus } from "../../../model/UserStatus";
import { User } from "../../../model/User";




export class GetAllUserOperation extends UserAuthOperationTemplate<UserResultList, PageAndSizeParams>{

    private userRepository: IUserEngineRepository;
    private userStatusRepository: IUserStatusEngineRepository;
    private status: UserStatus;

    constructor() {
        super(OperationNamesEnum.USER_CREATE, OperationValidatorManager.getSingletonInstance())
        this.userRepository = container.resolve<IUserEngineRepository>("IUserEngineRepository")
        this.userStatusRepository = container.resolve<IUserStatusEngineRepository>("IUserStatusEngineRepository")

    }

    protected async doValidateParameters(params: PageAndSizeParams): Promise<void> {

        if (params.getQueryParam) {
            this.status = await this.userStatusRepository.findStatusCode(params.getQueryParam);

            if (!this.status) {
                logger.error("[GetAllUserOperation] Status not found")
                throw new NotFoundException(Field.USER_STATUS_CODE, MiddlewareBusinessMessage.USER_STATUS_NOT_FOUND);
            }
        }

    }

    protected async doUserAuthExecuted(tokenSession: TokenSession, params: PageAndSizeParams, result: UserResultList): Promise<void> {


        logger.info("[GetAllUserOperation] creating all users")
        const newNews:IPage<User> = await this.userRepository.findAllNews(params.getPage, params.size,this.status,params.orderColumn,params.direction);
        //PageableUtils.ofWithoutContent(result, newNews)

        Object.assign(result,newNews);

        this.message.set(Field.INFO, new ResultInfo(MiddlewareBusinessMessage.NEWS_GET_ALL_SUCCESSFULLY));
        result.setStatus = Object.fromEntries(this.message)

    }

    protected initResult(): UserResultList {
        return new UserResultList()
    }

}

