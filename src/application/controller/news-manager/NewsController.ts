
import logger from "../../../infrestructure/config/logger";
import { NotImplementedException } from "../../../infrestructure/exceptions/NotImplementedException";
import { InvalidParametersException } from "../../../infrestructure/exceptions/InvalidParametersException";
import { UnauthorizedOperationException } from "../../../infrestructure/exceptions/UnauthorizedOperationException";
import { HttpCodes } from "../../../infrestructure/response/enum/HttpCode";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ErrorExceptionClass } from "../../../infrestructure/exceptions/ErrorExceptionClass";
import { AuthValidator } from "../validator/AuthValidator";
import { UnsuccessfullOperationException } from "../../../infrestructure/exceptions/UnsuccessfullOperationException";
import { NewsParams } from "../../model/news-manager/NewsParams";
import { INewsEngine } from "../../../domain/service/INewsEngine";
import { Field } from "../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../infrestructure/response/enum/MiddlewareCustomMessage";
import { NewsFileParams } from "../../model/news-manager/NewsFileParams";
import { PageAndSizeParams } from "../../model/PageAndSizeParams";
import { RequestHandler, ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { NewsCategoryParams } from "../../model/news-manager/NewsCategoryParams";

export class NewsController {


  public async getAllNews(request: Request, response: Response): Promise<Response> {
    try {
      const { page = 1, size = 10, category: categoryCode, direction, orderColumn } = request.query;

      const pageNumber = Number(page);
      const pageSize = Number(size);
      const categoryString = categoryCode ? String(categoryCode) : null;

      // Get the order column and direction
      const column = orderColumn ? String(orderColumn) : null;
      const directionOrder = direction ? direction as 'ASC' | 'DESC' : null;

      const authenticationToken = AuthValidator.checkAuthorizationToken(request);
      const params = new PageAndSizeParams(authenticationToken, pageNumber, pageSize, categoryString, column, directionOrder);


      logger.info("[NewsController] Perform dependency injection for UserController")

      const newsEngine = container.resolve<INewsEngine>("INewsEngine")
      logger.info("[NewsController] Perform dependency injection for UserController was successfully")


      const result = await newsEngine.getAllNews(params)
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
      else {
        throw error;
      }
    }
  }
  public async uploadImageNews(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      if (!request.file) {
        logger.info("[NewsController] ivalid file upload")
        throw new InvalidParametersException(Field.NEWS, MiddlewareBusinessMessage.NEWS_INVALID_FILE_UPLOAD);
      }

      const { path: imagePath } = request.file; // Access the file path

      //const authenticationToken =  new AuthorizationOFperationTemplate().checkAuthorizationToken(request)
      //não deixa acesso a classe extendida então usou-se static
      const authenticationToken = AuthValidator.checkAuthorizationToken(request);
      const params = new NewsFileParams(authenticationToken, id, imagePath)

      logger.info("[NewsController] Perform dependency injection for UserController")

      const newsEngine = container.resolve<INewsEngine>("INewsEngine")
      logger.info("[NewsController] Perform dependency injection for UserController was successfully")


      const result = await newsEngine.addNewsFile(params)
      return response.status(HttpCodes.OK).json(result)
    } catch (error) {
      console.error(error);

      throw error;
    }

  }
  public async deleteNews(arg0: string, deleteNews: any) {
    throw new Error("Method not implemented.");
  }
  public async updateNews(request: Request, response: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }

  public async getNewsById(request: Request, response: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  public async createNews(request: Request, response: Response): Promise<Response> {
    try {
      const { title, message, categoryCode } = request.body;


      //const authenticationToken =  new AuthorizationOperationTemplate().checkAuthorizationToken(request)
      //não deixa acesso a classe extendida então usou-se static
      const authenticationToken = AuthValidator.checkAuthorizationToken(request);
      const params = new NewsParams(authenticationToken, title, message, categoryCode)

      logger.info("[NewsController] Perform dependency injection for UserController")

      const newsEngine = container.resolve<INewsEngine>("INewsEngine")
      logger.info("[NewsController] Perform dependency injection for UserController was successfully")


      const result = await newsEngine.addNews(params)
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
      else {
        throw error;
      }
    }
  }

  public async createNewsCategory(request: Request, response: Response): Promise<Response> {
    try {
      const { code, description } = request.body;
  
      const authenticationToken = AuthValidator.checkAuthorizationToken(request);
      const params = new NewsCategoryParams(authenticationToken, code, description);
  
      logger.info('[PermissionController] Performing dependency injection for PermissionGroupEngine');
      const newsEngine = container.resolve<INewsEngine>('INewsEngine');
      logger.info('[PermissionController] Dependency injection for PermissionGroupEngine was successful');
  
      const result = await newsEngine.addNewsCategory(params);
      return response.status(HttpCodes.OK).json(result);
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
      else {
        throw error;
      }
    }
  }
  public async getNewsCategoryByCode(request: Request, response: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }
  public async getAllNewsCategory(request: Request, response: Response): Promise<Response> {
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
      const newsEngine = container.resolve<INewsEngine>('INewsEngine');
      logger.info('[PermissionController] Dependency injection for PermissionEngine was successful');
  
      const result = await newsEngine.getAllNewsCategory(params);
      return response.status(HttpCodes.OK).json(result);
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
      else {
        throw error;
      }
    }
  }


}
export default { NewsController }





