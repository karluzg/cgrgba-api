import { ISessionEngine } from "../ISessionEngine";
import { UserParams } from "../../../application/model/user-manager/UserParams";
import { UserResult } from "../../../application/model/user-manager/UserResult";
import { GenericOperationTemplate } from "../../../infrestructure/template/GenericOperationTemplate";
import { LoginOperation } from "../../operation/user-manager/LoginOperation";
import { injectable } from "tsyringe";
import { UserLoginParams } from "../../../application/model/user-manager/UserLoginParams";
import { UserLoginResult } from "../../../application/model/user-manager/UserLoginResult";


@injectable()
export class SessionEngineImpl extends GenericOperationTemplate implements ISessionEngine {
    
    
    async login(params: UserLoginParams): Promise<UserLoginResult> {
        return await this.executeOperation(new LoginOperation(), params)
    }

}
