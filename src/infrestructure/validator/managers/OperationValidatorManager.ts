
import { ResultTemplate } from "../../template/ResultTemplate";
import { IAuthParams } from "../../interface/IAuthParams";
import { UserAuthOperationTemplate } from "../../template//UserAuthOperationTemplate";
import { container } from "tsyringe";
import { IPermissionEngineRepository } from "../../../domain/repository/IPermissionEngineRepository";
import { UnauthorizedOperationException } from "../../exceptions/UnauthorizedOperationException";
import logger from "../../config/logger";
import { TokenSession } from "../../../domain/model/TokenSession";
import { MiddlewareBusinessMessage } from "../../response/enum/MiddlewareCustomMessage";
import { Field } from "../../exceptions/enum/Field";


export class OperationValidatorManager {

  private static instance: OperationValidatorManager;


  public static getSingletonInstance(): OperationValidatorManager {

    if (!this.instance) {
      this.instance = new OperationValidatorManager();

      return this.instance

    } else {
      return this.instance;
    }
  }

  public async isOperationAllowed<R extends ResultTemplate, P extends IAuthParams>(tokenSession: TokenSession, operation: UserAuthOperationTemplate<R, P>): Promise<boolean> {

    logger.info("[OperationValidatorManager] Perform dependency injection for IPermissionEngineRepository")

    const permissionRepositoy = container.resolve<IPermissionEngineRepository>("IPermissionEngineRepository")


    logger.info("Searching permission in data base")

    const permissionEntity = await permissionRepositoy.findByPermissionId(operation.getOperationId())

    if (permissionEntity == null) {
      logger.error("Permission operation %s was not found", operation.getOperationId())
      throw new UnauthorizedOperationException(Field.SYSTEM, MiddlewareBusinessMessage.CORE_OPERATION_WAS_NOT_FOUND)
    }

    logger.info("permission was founded. validate if operation is valid for user")
    return await permissionRepositoy.isUserOperationAllowed(operation.getOperationId(), tokenSession.user.id)


  }


}