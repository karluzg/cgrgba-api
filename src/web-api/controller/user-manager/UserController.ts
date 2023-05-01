
import logger from "../../../common/config/logger";
import { NotImplementedException } from "../../../common/exceptions/NotImplementedException";
import { InvalidParametersException } from "../../../common/exceptions/InvalidParametersException";
import { UnauthorizedOperationException } from "../../../common/exceptions/UnauthorizedOperationException";

import { HttpCode } from "../../../common/response/HttpCode";
import { IUserEngine } from "../../../engine-interface/services/IUserEngine";
import { RegisterUserParams } from "../../../engine-interface/params/user/RegisterUserParams";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ErrorExceptionClass } from "../../../common/exceptions/ErrorExceptionClass";


export class UserController {

  public registerUser(request: Request, response: Response): Response {

    try {
      const { authenticationToken, userFullName, userMobileNumber, userEmail } = request.body;

      const params = new RegisterUserParams(authenticationToken, userFullName, userMobileNumber, userEmail)

      logger.info("[UserController] Perform dependency injection for UserController")

      const userEngine = container.resolve<IUserEngine>("IUserEngine")
      logger.info("[UserController] Perform dependency injection for UserController was successfully")


      const result = userEngine.register_user(params)
      return response.status(HttpCode.OK).json(result)
    } catch (error) {

      if (error.errorClasseName === ErrorExceptionClass.NOT_IMPLEMENTED) {
        throw new NotImplementedException(error.field, error.message)

      } else if (error.errorClasseName === ErrorExceptionClass.INVALID_PARAMETERS) {
        throw new InvalidParametersException(error.field, error.message)

      } else if (error.errorClasseName === ErrorExceptionClass.UNAUTHORIZED) {
        throw new UnauthorizedOperationException(error.field, error.message)
      }
    }
  }
}
export default { UserController }





