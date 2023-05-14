
import logger from "../../../infrestructure/config/logger";
import { NotImplementedException } from "../../../infrestructure/exceptions/NotImplementedException";
import { InvalidParametersException } from "../../../infrestructure/exceptions/InvalidParametersException";
import { UnauthorizedOperationException } from "../../../infrestructure/exceptions/UnauthorizedOperationException";

import { HttpCode } from "../../../infrestructure/response/enum/HttpCode";
import { IUserEngine } from "../../../domain/service/IUserEngine";
import { UserParams } from "../../model/user-manager/UserParams";
import e, { Request, Response } from "express";
import { container } from "tsyringe";
import { ErrorExceptionClass } from "../../../infrestructure/exceptions/ErrorExceptionClass";
import { AuthValidator } from "../validator/AuthValidator";
import { UnsuccessfullOperationException } from "../../../infrestructure/exceptions/UnsuccessfullOperationException";
import { RequestHandler, ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";


export class PermissionController {




  public async addUser(request: Request, response: Response): Promise<Response> {

    try {
      const { fullName, mobileNumber, email } = request.body;


      //const authenticationToken =  new AuthorizationOperationTemplate().checkAuthorizationToken(request)
      //não deixa acesso a classe extendida então usou-se static
      const authenticationToken = AuthValidator.checkAuthorizationToken(request);
      const params = new UserParams(authenticationToken, fullName, mobileNumber, email)

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

      } else if (error.errorClasseName === ErrorExceptionClass.UNSUCCESSFULLY) {
        throw new UnsuccessfullOperationException(error.field, error.message)
      }
      else
        throw error;
    }
  }
  public async getPermissionByCode(request: Request, response: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }
  public async getPermissions(request: Request, response: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }
  public async createPermission(request: Request, response: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }

  public async deletePermission(request: Request, response: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }
  public async updatePermission(request: Request, response: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }


  public async createPermissionGroup(request: Request, response: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }
  public async getPermissionGroupByCode(request: Request, response: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }
  public async updatePermissionGroup(request: Request, response: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }
  public async deletePermissionGroup(request: Request, response: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }
  public async getAllPermissionGroups(request: Request, response: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }



}
export default { PermissionController }





