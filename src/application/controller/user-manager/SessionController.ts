import logger from "../../../infrestructure/config/logger";
import { NotImplementedException } from "../../../infrestructure/exceptions/NotImplementedException";
import { InvalidParametersException } from "../../../infrestructure/exceptions/InvalidParametersException";
import { UnauthorizedOperationException } from "../../../infrestructure/exceptions/UnauthorizedOperationException";

import { HttpCode } from "../../../infrestructure/response/enum/HttpCode";
import { ISessionEngine } from "../../../domain/service/ISessionEngine";
import { UserLoginParams } from "../../../application/model/user-manager/UserLoginParams";
import e, { Request, Response } from "express";
import { container } from "tsyringe";
import { ErrorExceptionClass } from "../../../infrestructure/exceptions/ErrorExceptionClass";
import { AuthValidator } from "../validator/AuthValidator";
import { UnsuccessfullOperationException } from "../../../infrestructure/exceptions/UnsuccessfullOperationException";


export class SessionController {


  public async login(request: Request, response: Response): Promise<Response> {

    try {
      const {  userEmail, userPassword} = request.body;

      const params = new UserLoginParams( userEmail,userPassword)

      logger.info("[UserController] Perform dependency injection for UserController")

      const sesionEngine = container.resolve<ISessionEngine>("ISessionEngine")
      logger.info("[UserController] Perform dependency injection for UserController was successfully")


      const result = await sesionEngine.login(params)
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
  }}