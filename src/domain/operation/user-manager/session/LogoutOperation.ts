import { OperationTemplate } from "../../../../infrestructure/template/OperationTemplate";
import { OperationNamesEnum } from "../../../model/enum/OperationNamesEnum";
import { TokenSession } from "../../../model/TokenSession";
import { Field } from "../../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../../infrestructure/response/enum/MiddlewareCustomMessage";
import { ITokenEngineRepository } from "../../../repository/ITokenEngineRepository";
import { container } from 'tsyringe'
import { InvalidParametersException } from "../../../../infrestructure/exceptions/InvalidParametersException";
import { UserLogoutResult } from "../../../../application/model/user-manager/UserLogoutResult";
import { UserLogoutParams } from "../../../../application/model/user-manager/UserLogoutParams";
import { UnsuccessfullOperationException } from "../../../../infrestructure/exceptions/UnsuccessfullOperationException";


export class LogoutOperation extends OperationTemplate<UserLogoutResult, UserLogoutParams>{


    private tokenRepository: ITokenEngineRepository;
    private token: TokenSession;

    constructor() {
        super(OperationNamesEnum.SESSION_LOGIN)
        this.tokenRepository = container.resolve<ITokenEngineRepository>("ITokenEngineRepository")
    }

    protected async doValidateParameters(params: UserLogoutParams): Promise<void> {

        this.token = await this.tokenRepository.findByToken(params.getToken)

        if (!this.token) {
            throw new InvalidParametersException(Field.USER, MiddlewareBusinessMessage.SESSION_NOT_EXIST);
        }

    }

    protected async doExecute(params: UserLogoutParams, result: UserLogoutResult) {

        const expireDate = new Date();
        this.token.expireDate = expireDate;
        this.token.expireDateInMilliseconds = expireDate.getTime();

        const tokenResult = await this.tokenRepository.saveTokenSession(this.token);

        if (tokenResult)
            result.setResult = true;
        else
            throw new UnsuccessfullOperationException(Field.USER, MiddlewareBusinessMessage.SESSION_LOGOUT_ERROR);

    }



    protected initResult(): UserLogoutResult {
        return new UserLogoutResult()
    }



}
