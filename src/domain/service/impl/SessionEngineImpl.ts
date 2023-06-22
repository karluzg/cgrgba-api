import { ISessionEngine } from "../ISessionEngine";
import { UserParams } from "../../../application/model/user-manager/UserParams";
import { UserResult } from "../../../application/model/user-manager/UserResult";
import { GenericOperationTemplate } from "../../../infrestructure/template/GenericOperationTemplate";
import { LoginOperation } from "../../operation/user-manager/session/LoginOperation";
import { injectable } from "tsyringe";
import { UserLoginParams } from "../../../application/model/user-manager/UserLoginParams";
import { UserLoginResult } from "../../../application/model/user-manager/UserLoginResult";
import { UserLogoutParams } from "../../../application/model/user-manager/UserLogoutParams";
import { UserLogoutResult } from "../../../application/model/user-manager/UserLogoutResult";
import { LogoutOperation } from "../../operation/user-manager/session/LogoutOperation";


@injectable()
export class SessionEngineImpl extends GenericOperationTemplate implements ISessionEngine {
    
    
    async logout(params: UserLogoutParams): Promise<UserLogoutResult> {
        return await this.executeOperation(new LogoutOperation(), params)
    }
    
    
    async login(params: UserLoginParams): Promise<UserLoginResult> {
        return await this.executeOperation(new LoginOperation(), params)
    }

}
