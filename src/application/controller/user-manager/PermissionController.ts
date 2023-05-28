
import logger from "../../../infrestructure/config/logger";
import { NotImplementedException } from "../../../infrestructure/exceptions/NotImplementedException";
import { InvalidParametersException } from "../../../infrestructure/exceptions/InvalidParametersException";
import { UnauthorizedOperationException } from "../../../infrestructure/exceptions/UnauthorizedOperationException";

import { HttpCode } from "../../../infrestructure/response/enum/HttpCode";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ErrorExceptionClass } from "../../../infrestructure/exceptions/ErrorExceptionClass";
import { AuthValidator } from "../validator/AuthValidator";
import { UnsuccessfullOperationException } from "../../../infrestructure/exceptions/UnsuccessfullOperationException";
import { PermissionParams } from "../../model/user-manager/PermissionParams ";
import { IPermissionEngine } from "../../../domain/service/IPermissionEngine";
import { PermissionGroupParams } from "../../model/user-manager/PermissionGroupParams";
import { GetByEmailOrCodeParams } from "../../model/GetByEmailOrCodeParams";
import { PageAndSizeParams } from "../../model/PageAndSizeParams";
import { NotFoundException } from "../../../infrestructure/exceptions/NotFoundExcecption";


export class PermissionController {

  public async getPermissionByCode(request: Request, response: Response): Promise<Response> {
    try {
      const { code } = request.params;
  
      const authenticationToken = AuthValidator.checkAuthorizationToken(request);
      const params = new GetByEmailOrCodeParams(authenticationToken, code);
  
      logger.info('[PermissionController] Performing dependency injection for PermissionEngine');
      const permissionEngine = container.resolve<IPermissionEngine>('IPermissionEngine');
      logger.info('[PermissionController] Dependency injection for PermissionEngine was successful');
  
      const result = await permissionEngine.getPermissionByCode(params);
      return response.status(HttpCode.OK).json(result);
    } catch (error) {
      if (error.errorClassName === ErrorExceptionClass.NOT_IMPLEMENTED) {
        throw new NotImplementedException(error.field, error.message);
      } else if (error.errorClassName === ErrorExceptionClass.INVALID_PARAMETERS) {
        throw new InvalidParametersException(error.field, error.message);
      } else if (error.errorClassName === ErrorExceptionClass.UNAUTHORIZED) {
        throw new UnauthorizedOperationException(error.field, error.message);
      } else if (error.errorClassName === ErrorExceptionClass.UNSUCCESSFULLY) {
        throw new UnsuccessfullOperationException(error.field, error.message);
      } else if (error.errorClasseName === ErrorExceptionClass.NOT_FOUND) {
        throw new NotFoundException(error.field, error.message)
      } else
        throw new UnsuccessfullOperationException(error.field, error.message)
    }
  }
  public async getPermissions(request: Request, response: Response): Promise<Response> {
    try {
      const { page = 1, size = 10, group: grouCode, direction, orderColumn } = request.query;

      const pageNumber = Number(page);
      const pageSize = Number(size);
      const groupString = grouCode ? String(grouCode) : null;

      // Get the order column and direction
      const column = orderColumn ? String(orderColumn) : null;
      const directionOrder = direction ? direction as 'ASC' | 'DESC' : null;

      const authenticationToken = AuthValidator.checkAuthorizationToken(request);
      const params = new PageAndSizeParams(authenticationToken, pageNumber, pageSize, groupString, column, directionOrder);


      logger.info('[PermissionController] Performing dependency injection for PermissionEngine');
      const permissionEngine = container.resolve<IPermissionEngine>('IPermissionEngine');
      logger.info('[PermissionController] Dependency injection for PermissionEngine was successful');
  
      const result = await permissionEngine.getAllPermission(params);
      return response.status(HttpCode.OK).json(result);
    } catch (error) {
      if (error.errorClassName === ErrorExceptionClass.NOT_IMPLEMENTED) {
        throw new NotImplementedException(error.field, error.message);
      } else if (error.errorClassName === ErrorExceptionClass.INVALID_PARAMETERS) {
        throw new InvalidParametersException(error.field, error.message);
      } else if (error.errorClassName === ErrorExceptionClass.UNAUTHORIZED) {
        throw new UnauthorizedOperationException(error.field, error.message);
      } else if (error.errorClassName === ErrorExceptionClass.UNSUCCESSFULLY) {
        throw new UnsuccessfullOperationException(error.field, error.message);
      } else if (error.errorClasseName === ErrorExceptionClass.NOT_FOUND) {
        throw new NotFoundException(error.field, error.message)
      } else
        throw new UnsuccessfullOperationException(error.field, error.message)
    }
  }
  public async createPermission(request: Request, response: Response): Promise<Response> {
    try {
      const { code, description, group } = request.body;


      //const authenticationToken =  new AuthorizationOperationTemplate().checkAuthorizationToken(request)
      //não deixa acesso a classe extendida então usou-se static
      const authenticationToken = AuthValidator.checkAuthorizationToken(request);
      const params = new PermissionParams(authenticationToken, code, description, group)

      logger.info("[PermissionController] Perform dependency injection for UserController")

      const permissionEngine = container.resolve<IPermissionEngine>("IPermissionEngine")
      logger.info("[PermissionController] Perform dependency injection for UserController was successfully")


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
      }else if (error.errorClasseName === ErrorExceptionClass.NOT_FOUND) {
        throw new NotFoundException(error.field, error.message)
      } else
        throw new UnsuccessfullOperationException(error.field, error.message)
    }
  }

  public async deletePermission(request: Request, response: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }
  public async updatePermission(request: Request, response: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }


  public async createPermissionGroup(request: Request, response: Response): Promise<Response> {
    try {
      const { code, description } = request.body;
  
      const authenticationToken = AuthValidator.checkAuthorizationToken(request);
      const params = new PermissionGroupParams(authenticationToken, code, description);
  
      logger.info('[PermissionController] Performing dependency injection for PermissionGroupEngine');
      const permissionGroupEngine = container.resolve<IPermissionEngine>('IPermissionEngine');
      logger.info('[PermissionController] Dependency injection for PermissionGroupEngine was successful');
  
      const result = await permissionGroupEngine.addPermissionGroup(params);
      return response.status(HttpCode.OK).json(result);
    } catch (error) {
      if (error.errorClassName === ErrorExceptionClass.NOT_IMPLEMENTED) {
        throw new NotImplementedException(error.field, error.message);
      } else if (error.errorClassName === ErrorExceptionClass.INVALID_PARAMETERS) {
        throw new InvalidParametersException(error.field, error.message);
      } else if (error.errorClassName === ErrorExceptionClass.UNAUTHORIZED) {
        throw new UnauthorizedOperationException(error.field, error.message);
      } else if (error.errorClassName === ErrorExceptionClass.UNSUCCESSFULLY) {
        throw new UnsuccessfullOperationException(error.field, error.message);
      }else if (error.errorClasseName === ErrorExceptionClass.NOT_FOUND) {
        throw new NotFoundException(error.field, error.message)
      } else
        throw new UnsuccessfullOperationException(error.field, error.message)
    }
  }
  public async getPermissionGroupByCode(request: Request, response: Response): Promise<Response> {
    try {
      const { code } = request.params;
  
      const authenticationToken = AuthValidator.checkAuthorizationToken(request);
      const params = new GetByEmailOrCodeParams(authenticationToken, code);
  
      logger.info('[PermissionController] Performing dependency injection for PermissionGroupEngine');
      const permissionGroupEngine = container.resolve<IPermissionEngine>('IPermissionEngine');
      logger.info('[PermissionController] Dependency injection for PermissionGroupEngine was successful');
  
      const result = await permissionGroupEngine.getPermissionGroupByCode(params);
      return response.status(HttpCode.OK).json(result);
    } catch (error) {
      if (error.errorClassName === ErrorExceptionClass.NOT_IMPLEMENTED) {
        throw new NotImplementedException(error.field, error.message);
      } else if (error.errorClassName === ErrorExceptionClass.INVALID_PARAMETERS) {
        throw new InvalidParametersException(error.field, error.message);
      } else if (error.errorClassName === ErrorExceptionClass.UNAUTHORIZED) {
        throw new UnauthorizedOperationException(error.field, error.message);
      } else if (error.errorClassName === ErrorExceptionClass.UNSUCCESSFULLY) {
        throw new UnsuccessfullOperationException(error.field, error.message);
      }else if (error.errorClasseName === ErrorExceptionClass.NOT_FOUND) {
        throw new NotFoundException(error.field, error.message)
      } else
        throw new UnsuccessfullOperationException(error.field, error.message)
    }
  }
  public async updatePermissionGroup(request: Request, response: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }
  public async deletePermissionGroup(request: Request, response: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }
  public async getAllPermissionGroups(request: Request, response: Response): Promise<Response> {
    try {
      const { page = 1, size = 10, direction, orderColumn } = request.query;

      const pageNumber = Number(page);
      const pageSize = Number(size);

      // Get the order column and direction
      const column = orderColumn ? String(orderColumn) : null;
      const directionOrder = direction ? direction as 'ASC' | 'DESC' : null;

      const authenticationToken = AuthValidator.checkAuthorizationToken(request);
      const params = new PageAndSizeParams(authenticationToken, pageNumber, pageSize, null, column, directionOrder);


      logger.info('[PermissionController] Performing dependency injection for PermissionEngine');
      const permissionEngine = container.resolve<IPermissionEngine>('IPermissionEngine');
      logger.info('[PermissionController] Dependency injection for PermissionEngine was successful');
  
      const result = await permissionEngine.getAllPermissionGroup(params);
      return response.status(HttpCode.OK).json(result);
    } catch (error) {
      if (error.errorClassName === ErrorExceptionClass.NOT_IMPLEMENTED) {
        throw new NotImplementedException(error.field, error.message);
      } else if (error.errorClassName === ErrorExceptionClass.INVALID_PARAMETERS) {
        throw new InvalidParametersException(error.field, error.message);
      } else if (error.errorClassName === ErrorExceptionClass.UNAUTHORIZED) {
        throw new UnauthorizedOperationException(error.field, error.message);
      } else if (error.errorClassName === ErrorExceptionClass.UNSUCCESSFULLY) {
        throw new UnsuccessfullOperationException(error.field, error.message);
      } else if (error.errorClasseName === ErrorExceptionClass.NOT_FOUND) {
        throw new NotFoundException(error.field, error.message)
      } else
        throw new UnsuccessfullOperationException(error.field, error.message)
    }
  }



}
export default { PermissionController }





