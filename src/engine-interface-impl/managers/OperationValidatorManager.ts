
import { Result } from "../../engine-interface/Result";
import { AuthParams } from "../../engine-interface/AuthParams";
import { UserAuthOperationTemplate } from "../operation/UserAuthOperationTemplate";
import { container } from "tsyringe";
import { IPermissionEngineRepository } from "../../repository/engine/IPermissionEngineRepository";
import { UnauthorizedOperationException } from "../../common/exceptions/UnauthorizedOperationException";
import logger from "../../common/config/logger";
import { TokenSession } from "../../domain-model/TokenSession";
import { MiddlewareCustomErrorMessage } from "../../common/response/CustomErrorMessage";


export class OperationValidatorManager {

  public isOperationAllowed<R extends Result, P extends AuthParams>(tokenSession: TokenSession, operation: UserAuthOperationTemplate<R, P>): Promise<boolean> {

    logger.info("[OperationValidatorManager] Perform dependency injection for IPermissionEngineRepository")

    const permissionRepositoy = container.resolve<IPermissionEngineRepository>("PermissionEngineRepositoryImpl")



    logger.info("Searching permission in data base")

    const permissionEntity = permissionRepositoy.findByPermissionId(operation.getOperationId())

    if (permissionEntity == null) {
      logger.error("Operation was not found", operation.getOperationId())
      throw new UnauthorizedOperationException(MiddlewareCustomErrorMessage.OPERATION_WAS_NOT_FOUND + operation.getOperationId())
    }

    logger.info("permission was founded. validate if operation is valid for user")
    return permissionRepositoy.isUserOperationAllowed(operation.getOperationId(), tokenSession.user.id)






  }


}