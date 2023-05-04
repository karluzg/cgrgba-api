
import logger from "../../../infrestructure/config/logger";
import { NotImplementedException } from "../../../infrestructure/exceptions/NotImplementedException";
import { InvalidParametersException } from "../../../infrestructure/exceptions/InvalidParametersException";
import { UnauthorizedOperationException } from "../../../infrestructure/exceptions/UnauthorizedOperationException";

import { HttpCode } from "../../../infrestructure/response/enum/HttpCode";
import { IUserEngine } from "../../../domain/service/IUserEngine";
import { UserParams } from "../../../application/model/user-manager/UserParams";
import e, { Request, Response } from "express";
import { container } from "tsyringe";
import { ErrorExceptionClass } from "../../../infrestructure/exceptions/ErrorExceptionClass";
import { AuthValidator } from "../validator/AuthValidator";
import { UnsuccessfullOperationException } from "../../../infrestructure/exceptions/UnsuccessfullOperationException";


export class UserController {


  public async addUser(request: Request, response: Response):Promise< Response> {

    try {
      const { userFullName, userMobileNumber, userEmail } = request.body;

      
      //const authenticationToken =  new AuthorizationOperationTemplate().checkAuthorizationToken(request)
      //não deixa acesso a classe extendida então usou-se static
      const authenticationToken = AuthValidator.checkAuthorizationToken(request);
      const params = new UserParams(authenticationToken, userFullName, userMobileNumber, userEmail)

      logger.info("[UserController] Perform dependency injection for UserController")

      const userEngine = container.resolve<IUserEngine>("IUserEngine")
      logger.info("[UserController] Perform dependency injection for UserController was successfully")


      const result =await userEngine.addUser(params)
      return response.status(HttpCode.OK).json(result)
    } catch (error) {

      if (error.errorClasseName === ErrorExceptionClass.NOT_IMPLEMENTED) {
        throw new NotImplementedException(error.field, error.message)

      } else if (error.errorClasseName === ErrorExceptionClass.INVALID_PARAMETERS) {
        throw new InvalidParametersException(error.field, error.message)

      } else if (error.errorClasseName === ErrorExceptionClass.UNAUTHORIZED) {
        throw new UnauthorizedOperationException(error.field, error.message)
        
      } else if (error.errorClasseName === ErrorExceptionClass.UNSUCCESSFULLY) {
        throw new UnsuccessfullOperationException(error.field, error.message)
      }
      else
      throw error;
    }
  }
  
  public async getUsers(request: Request, response: Response): Promise< Response> {

    try {
      const { authenticationToken, userFullName, userMobileNumber, userEmail } = request.body;

      const params = new UserParams(authenticationToken, userFullName, userMobileNumber, userEmail)

      logger.info("[UserController] Perform dependency injection for UserController")

      const userEngine = container.resolve<IUserEngine>("IUserEngine")
      logger.info("[UserController] Perform dependency injection for UserController was successfully")


      const result = await userEngine.addUser(params)
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
  public async getUserById(request: Request, response: Response): Promise< Response> {

    try {
      const { authenticationToken, userFullName, userMobileNumber, userEmail } = request.body;

      const params = new UserParams(authenticationToken, userFullName, userMobileNumber, userEmail)

      logger.info("[UserController] Perform dependency injection for UserController")

      const userEngine = container.resolve<IUserEngine>("IUserEngine")
      logger.info("[UserController] Perform dependency injection for UserController was successfully")


      const result = await userEngine.addUser(params)
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





