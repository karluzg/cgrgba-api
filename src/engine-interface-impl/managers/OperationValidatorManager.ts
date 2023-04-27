
import { Result } from "../../engine-interface/Result";
import { AuthParams } from "../../engine-interface/AuthParams";
import { UserAuthOperationTemplate } from "../operation/UserAuthOperationTemplate";
import { container } from "tsyringe";
import { IPermissionEngineRepository } from "../../repository/engine/IPermissionEngineRepository";
import { UnauthorizedOperationException } from "../../common/exceptions/UnauthorizedOperationException";
import logger from "../../common/config/logger";
import { TokenSession } from "../../domain-model/session/TokenSession";


export class OperationValidatorManager{

    public  isOperationAllowed<R extends Result, P extends AuthParams> (tokenSession:TokenSession,  operation:UserAuthOperationTemplate<R,P>):Promise<boolean>{


        const permissionRepositoy =container.resolve<IPermissionEngineRepository>("IUserEngine")

      const permissionEntity=  permissionRepositoy.findByPermissionId(operation.getOperationId())

      if(permissionEntity==null){
        logger.error("Operação com id %s não encontrada", operation.getOperationId())
        throw new UnauthorizedOperationException("Operação com id"+""+operation.getOperationId()+""+"não encontrada")
      }

        return permissionRepositoy.isUserOperationAllowed(operation.getOperationId(), tokenSession.user.id)






    }
        

}