
import logger from "../../../infrestructure/config/logger";
import { NotImplementedException } from "../../../infrestructure/exceptions/NotImplementedException";
import { InvalidParametersException } from "../../../infrestructure/exceptions/InvalidParametersException";
import { UnauthorizedOperationException } from "../../../infrestructure/exceptions/UnauthorizedOperationException";

import { HttpCodes } from "../../../infrestructure/response/enum/HttpCode";
import { IUserEngine } from "../../../domain/service/IUserEngine";
import { UserParams } from "../../model/user-manager/UserParams";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ErrorExceptionClass } from "../../../infrestructure/exceptions/ErrorExceptionClass";
import { AuthValidator } from "../validator/AuthValidator";
import { UnsuccessfullOperationException } from "../../../infrestructure/exceptions/UnsuccessfullOperationException";
import { RequestHandler, ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { GetByIdParams } from "../../model/GetByIdParams";
import { GetByEmailOrCodeParams } from "../../model/GetByEmailOrCodeParams";
import { PageAndSizeParams } from "../../model/PageAndSizeParams";
import { RoleParams } from "../../model/user-manager/RoleParams";
import { IRoleEngine } from "../../../domain/service/IRoleEngine";
import { NotFoundException } from "../../../infrestructure/exceptions/NotFoundExcecption";


export class RoleController {


  getPermissions(request: Request, response: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }
  removePermissions(request: Request, response: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }
  addPermissions(request: Request, response: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }
  updateRole(request: Request, response: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }
  public async createRole(request: Request, response: Response): Promise<Response> {
    try {
      const { name, permissions, description, isAdmin } = request.body;


      //const authenticationToken =  new AuthorizationOperationTemplate().checkAuthorizationToken(request)
      //não deixa acesso a classe extendida então usou-se static
      const authenticationToken = AuthValidator.checkAuthorizationToken(request);
      const params = new RoleParams(authenticationToken, name, description, isAdmin, permissions)

      logger.info("[UserController] Perform dependency injection for UserController")

      const userEngine = container.resolve<IRoleEngine>("IRoleEngine")
      logger.info("[UserController] Perform dependency injection for UserController was successfully")


      const result = await userEngine.addRole(params)
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
      } else if (error.errorClasseName === ErrorExceptionClass.NOT_FOUND) {
        throw new NotFoundException(error.field, error.message)
      } else
        throw new UnsuccessfullOperationException(error.field, error.message)
    }
  }

  public async getRoleById(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params; // Obtém o ID do parâmetro da URL

      const authenticationToken = AuthValidator.checkAuthorizationToken(request);
      const params = new GetByIdParams(authenticationToken, parseInt(id, 10));

      logger.info('[UserController] Performing dependency injection for UserEngine');
      const roleEngine = container.resolve<IRoleEngine>('IRoleEngine');
      logger.info('[UserController] Dependency injection for UserEngine was successful');

      const result = await roleEngine.getRoleById(params);
      return response.status(HttpCode.OK).json(result);
    } catch (error) {
      if (error.errorClassName === ErrorExceptionClass.NOT_IMPLEMENTED) {
        throw new NotImplementedException(error.field, error.message);
      } else if (error.errorClassName === ErrorExceptionClass.INVALID_PARAMETERS) {
        throw new InvalidParametersException(error.field, error.message);
      } else if (error.errorClassName === ErrorExceptionClass.UNAUTHORIZED) {
        throw new UnauthorizedOperationException(error.field, error.message);
      } else if (error.errorClasseName === ErrorExceptionClass.NOT_FOUND) {
        throw new NotFoundException(error.field, error.message)
      } else
        throw new UnsuccessfullOperationException(error.field, error.message)
    }
  }

  public async getRoleByName(request: Request, response: Response): Promise<Response> {
    try {
      const { name } = request.params; // Obtém o ID do parâmetro da URL

      const authenticationToken = AuthValidator.checkAuthorizationToken(request);
      const params = new GetByEmailOrCodeParams(authenticationToken, name);

      logger.info('[UserController] Performing dependency injection for UserEngine');
      const roleEngine = container.resolve<IRoleEngine>('IRoleEngine');
      logger.info('[UserController] Dependency injection for UserEngine was successful');

      const result = await roleEngine.getRoleByName(params);
      return response.status(HttpCode.OK).json(result);
    } catch (error) {
      if (error.errorClassName === ErrorExceptionClass.NOT_IMPLEMENTED) {
        throw new NotImplementedException(error.field, error.message);
      } else if (error.errorClassName === ErrorExceptionClass.INVALID_PARAMETERS) {
        throw new InvalidParametersException(error.field, error.message);
      } else if (error.errorClassName === ErrorExceptionClass.UNAUTHORIZED) {
        throw new UnauthorizedOperationException(error.field, error.message);
      } else if (error.errorClasseName === ErrorExceptionClass.NOT_FOUND) {
        throw new NotFoundException(error.field, error.message)
      } else
        throw new UnsuccessfullOperationException(error.field, error.message)
    }
  }
  public async getAllRoles(request: Request, response: Response): Promise<Response> {
    try {
      const { page = 1, size = 10, direction, orderColumn } = request.query;

      const pageNumber = Number(page);
      const pageSize = Number(size);

      // Get the order column and direction
      const column = orderColumn ? String(orderColumn) : null;
      const directionOrder = direction ? direction as 'ASC' | 'DESC' : null;

      const authenticationToken = AuthValidator.checkAuthorizationToken(request);
      const params = new PageAndSizeParams(authenticationToken, pageNumber, pageSize, null, column, directionOrder);


      logger.info("[NewsController] Perform dependency injection for UserController")

      const roleEngine = container.resolve<IRoleEngine>("IRoleEngine")
      logger.info("[NewsController] Perform dependency injection for UserController was successfully")


      const result = await roleEngine.getAllRoles(params)
      return response.status(HttpCode.OK).json(result)
    } catch (error) {

      if (error.errorClasseName === ErrorExceptionClass.NOT_IMPLEMENTED) {
        throw new NotImplementedException(error.field, error.message)

      } else if (error.errorClasseName === ErrorExceptionClass.INVALID_PARAMETERS) {
        throw new InvalidParametersException(error.field, error.message)

      } else if (error.errorClasseName === ErrorExceptionClass.UNAUTHORIZED) {
        throw new UnauthorizedOperationException(error.field, error.message)
      } else if (error.errorClasseName === ErrorExceptionClass.NOT_FOUND) {
        throw new NotFoundException(error.field, error.message)
      } else
        throw new UnsuccessfullOperationException(error.field, error.message)
    }
  }



}
export default { RoleController }





