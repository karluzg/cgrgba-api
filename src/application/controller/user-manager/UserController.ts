
import logger from "../../../infrestructure/config/logger";
import { NotImplementedException } from "../../../infrestructure/exceptions/NotImplementedException";
import { InvalidParametersException } from "../../../infrestructure/exceptions/InvalidParametersException";
import { UnauthorizedOperationException } from "../../../infrestructure/exceptions/UnauthorizedOperationException";
import { HttpCodes } from "../../../infrestructure/response/enum/HttpCode";
import { IUserEngine } from "../../../domain/service/IUserEngine";
import { UserParams } from "../../../application/model/user-manager/UserParams";
import { container } from "tsyringe";
import { ErrorExceptionClass } from "../../../infrestructure/exceptions/ErrorExceptionClass";
import { AuthValidator } from "../validator/AuthValidator";
import { UnsuccessfullOperationException } from "../../../infrestructure/exceptions/UnsuccessfullOperationException";
import { UpdatePasswordParams } from "../../model/user-manager/UpdatePasswordParams";
import { ResetPasswordParams } from "../../model/user-manager/ResetPasswordParams";
import { PageAndSizeParams } from "../../model/PageAndSizeParams";
import { GetByIdParams } from "../../model/GetByIdParams";
import { GetByEmailOrCodeParams } from "../../model/GetByEmailOrCodeParams";
import { Request, Response } from "express";


export class UserController {

  public async addUser(request: Request, response: Response): Promise<Response> {

    try {
      const { fullName, mobileNumber, email, roles } = request.body;

      const authenticationToken = AuthValidator.checkAuthorizationToken(request);
      const params = new UserParams(authenticationToken, fullName, mobileNumber, email, roles)

      logger.info("[UserController] Perform dependency injection for UserController")

      const userEngine = container.resolve<IUserEngine>("IUserEngine")
      logger.info("[UserController] Perform dependency injection for UserController was successfully")


      const result = await userEngine.addUser(params)
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
      }
      else
        throw error;
    }
  }

  public async getUsers(request: Request, response: Response): Promise<Response> {

    try {
      const { page = 1, size = 10, status: statusCode, direction, orderColumn } = request.query;

      const pageNumber = Number(page);
      const pageSize = Number(size);
      const statusString = statusCode ? String(statusCode) : null;

      // Get the order column and direction
      const column = orderColumn ? String(orderColumn) : null;
      const directionOrder = direction ? direction as 'ASC' | 'DESC' : null;

      const authenticationToken = AuthValidator.checkAuthorizationToken(request);
      const params = new PageAndSizeParams(authenticationToken, pageNumber, pageSize, statusString, column, directionOrder);


      logger.info("[NewsController] Perform dependency injection for UserController")

      const userEngine = container.resolve<IUserEngine>("IUserEngine")
      logger.info("[NewsController] Perform dependency injection for UserController was successfully")


      const result = await userEngine.getAllUsers(params)
      return response.status(HttpCodes.OK).json(result)
    } catch (error) {

      if (error.errorClasseName === ErrorExceptionClass.NOT_IMPLEMENTED) {
        throw new NotImplementedException(error.field, error.message)

      } else if (error.errorClasseName === ErrorExceptionClass.INVALID_PARAMETERS) {
        throw new InvalidParametersException(error.field, error.message)

      } else if (error.errorClasseName === ErrorExceptionClass.UNAUTHORIZED) {
        throw new UnauthorizedOperationException(error.field, error.message)

      } else
        throw new UnsuccessfullOperationException(error.field, error.message)
    }
  }
  public async getUserById(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params; // Obtém o ID do parâmetro da URL

      const authenticationToken = AuthValidator.checkAuthorizationToken(request);
      const params = new GetByIdParams(authenticationToken, parseInt(id, 10));

      logger.info('[UserController] Performing dependency injection for UserEngine');
      const userEngine = container.resolve<IUserEngine>('IUserEngine');
      logger.info("[UserController] Perform dependency injection for UserController was successfully")


      const result = await userEngine.getUserById(params)
      return response.status(HttpCodes.OK).json(result)
    } catch (error) {
      console.log(error)
      if (error.errorClassName === ErrorExceptionClass.NOT_IMPLEMENTED) {
        throw new NotImplementedException(error.field, error.message);
      } else if (error.errorClassName === ErrorExceptionClass.INVALID_PARAMETERS) {
        throw new InvalidParametersException(error.field, error.message);
      } else if (error.errorClassName === ErrorExceptionClass.UNAUTHORIZED) {
        throw new UnauthorizedOperationException(error.field, error.message);
      } else
        throw new UnsuccessfullOperationException(error.field, error.message) 
    }
  }
  public async getUserByEmail(request: Request, response: Response): Promise<Response> {
    try {
      const { email } = request.params; // Obtém o email do parâmetro da URL

      const authenticationToken = AuthValidator.checkAuthorizationToken(request);
      const params = new GetByEmailOrCodeParams(authenticationToken, email);

      logger.info('[UserController] Performing dependency injection for UserEngine');
      const userEngine = container.resolve<IUserEngine>('IUserEngine');
      logger.info('[UserController] Dependency injection for UserEngine was successful');

      const result = await userEngine.getUserByEmail(params);
      return response.status(HttpCodes.OK).json(result);
    } catch (error) {
      if (error.errorClassName === ErrorExceptionClass.NOT_IMPLEMENTED) {
        throw new NotImplementedException(error.field, error.message);
      } else if (error.errorClassName === ErrorExceptionClass.INVALID_PARAMETERS) {
        throw new InvalidParametersException(error.field, error.message);
      } else if (error.errorClassName === ErrorExceptionClass.UNAUTHORIZED) {
        throw new UnauthorizedOperationException(error.field, error.message);
      } else
        throw new UnsuccessfullOperationException(error.field, error.message)
    }
  }


  public async updateUser(request: Request, response: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }

  public async updatePassword(request: Request, response: Response): Promise<Response> {

    try {
      const { oldPassword, newPassword, confirmPassword } = request.body;


      //const authenticationToken =  new AuthorizationOperationTemplate().checkAuthorizationToken(request)
      //não deixa acesso a classe extendida então usou-se static
      const authenticationToken = AuthValidator.checkAuthorizationToken(request);
      const params = new UpdatePasswordParams(authenticationToken, oldPassword, newPassword, confirmPassword)

      logger.info("[updatePassword] Perform dependency injection for UserController")

      const userEngine = container.resolve<IUserEngine>("IUserEngine")
      logger.info("[updatePassword] Perform dependency injection for UserController was successfully")


      const result = await userEngine.updatePassword(params)
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
  public async resetPassword(request: Request, response: Response): Promise<Response> {

    try {
      const { mobileNumber, email } = request.body;


      //const authenticationToken =  new AuthorizationOperationTemplate().checkAuthorizationToken(request)
      //não deixa acesso a classe extendida então usou-se static
      const params = new ResetPasswordParams(mobileNumber, email)

      logger.info("[resetPassword] Perform dependency injection for UserController")

      const userEngine = container.resolve<IUserEngine>("IUserEngine")
      logger.info("[resetPassword] Perform dependency injection for UserController was successfully")


      const result = await userEngine.resetPassword(params)
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
export default { UserController }





