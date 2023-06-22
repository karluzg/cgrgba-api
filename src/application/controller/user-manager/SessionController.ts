import logger from "../../../infrestructure/config/logger";
import { NotImplementedException } from "../../../infrestructure/exceptions/NotImplementedException";
import { InvalidParametersException } from "../../../infrestructure/exceptions/InvalidParametersException";
import { UnauthorizedOperationException } from "../../../infrestructure/exceptions/UnauthorizedOperationException";
import { HttpCodes } from "../../../infrestructure/response/enum/HttpCode";
import { ISessionEngine } from "../../../domain/service/ISessionEngine";
import { UserLoginParams } from "../../../application/model/user-manager/UserLoginParams";
import  { Request, Response } from "express";
import { container } from "tsyringe";
import { ErrorExceptionClass } from "../../../infrestructure/exceptions/ErrorExceptionClass";
import { UnsuccessfullOperationException } from "../../../infrestructure/exceptions/UnsuccessfullOperationException";
import { AuthValidator } from "../validator/AuthValidator";
import { UserLogoutParams } from "../../model/user-manager/UserLogoutParams";



export class SessionController {



  public async login(request: Request, response: Response): Promise<Response> {

    try {
      const { email, password } = request.body;

      const params = new UserLoginParams(email, password)

      logger.info("[UserController] Perform dependency injection for UserController")

      const sesionEngine = container.resolve<ISessionEngine>("ISessionEngine")
      logger.info("[UserController] Perform dependency injection for UserController was successfully")


      const result = await sesionEngine.login(params)
      return response.status(HttpCodes.OK).json(result)
    } catch (error) {

      if (error.errorClasseName === ErrorExceptionClass.NOT_IMPLEMENTED) {
        throw new NotImplementedException(error.field, error.message)

      } else if (error.errorClasseName === ErrorExceptionClass.INVALID_PARAMETERS) {
        throw new InvalidParametersException(error.field, error.message)
        
      } else if (error.errorClasseName === ErrorExceptionClass.UNAUTHORIZED) {
        throw new UnauthorizedOperationException(error.field, error.message)

      } else if (error.errorClasseName === ErrorExceptionClass.UNSUCCESSFULLY) {
        throw new UnsuccessfullOperationException(error.field, error.message)

      } else
        throw new UnsuccessfullOperationException(error.field, error.message)
    }


  }

  getTokenInformation(request: Request, response: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  hasPermission(request: Request, response: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  public async logout(request: Request, response: Response): Promise<Response>  {
    try {
      const authenticationToken = AuthValidator.checkAuthorizationToken(request);
      const params = new UserLogoutParams(authenticationToken)

      logger.info("[UserController] Perform dependency injection for UserController")

      const sesionEngine = container.resolve<ISessionEngine>("ISessionEngine")
      logger.info("[UserController] Perform dependency injection for UserController was successfully")


      const result = await sesionEngine.logout(params)
      return response.status(HttpCodes.OK).json(result)
    } catch (error) {

      if (error.errorClasseName === ErrorExceptionClass.NOT_IMPLEMENTED) {
        throw new NotImplementedException(error.field, error.message)

      } else if (error.errorClasseName === ErrorExceptionClass.INVALID_PARAMETERS) {
        throw new InvalidParametersException(error.field, error.message)
        
      } else if (error.errorClasseName === ErrorExceptionClass.UNAUTHORIZED) {
        throw new UnauthorizedOperationException(error.field, error.message)

      } else if (error.errorClasseName === ErrorExceptionClass.UNSUCCESSFULLY) {
        throw new UnsuccessfullOperationException(error.field, error.message)

      } else
        throw new UnsuccessfullOperationException(error.field, error.message)
    }

  }
}