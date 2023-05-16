
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
import { NewsParams } from "../../model/news-manager/NewsParams";
import { INewsEngine } from "../../../domain/service/INewsEngine";
import { Field } from "../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../infrestructure/response/enum/MiddlewareCustomErrorMessage";
import { NewsFileParams } from "../../model/news-manager/NewsFileParams";

export class NewsController {





  public async getAllNews(request: Request, response: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  public async uploadImageNews(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      if(!request.file)
      {
        logger.info("[NewsController] ivalid file upload")
        throw new InvalidParametersException(Field.NEWS, MiddlewareBusinessMessage.NEWS_INVALID_FILE_UPLOAD);
      }

      const { path: imagePath } = request.file; // Access the file path

      //const authenticationToken =  new AuthorizationOperationTemplate().checkAuthorizationToken(request)
      //não deixa acesso a classe extendida então usou-se static
      const authenticationToken = AuthValidator.checkAuthorizationToken(request);
      const params = new NewsFileParams(authenticationToken,id,imagePath)

      logger.info("[NewsController] Perform dependency injection for UserController")

      const newsEngine = container.resolve<INewsEngine>("INewsEngine")
      logger.info("[NewsController] Perform dependency injection for UserController was successfully")


      const result = await newsEngine.addNewsFile(params)
      return response.status(HttpCode.OK).json(result)
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
      const { title, content, message, categoryCode } = request.body;


      //const authenticationToken =  new AuthorizationOperationTemplate().checkAuthorizationToken(request)
      //não deixa acesso a classe extendida então usou-se static
      const authenticationToken = AuthValidator.checkAuthorizationToken(request);
      const params = new NewsParams(authenticationToken, title, content, message, categoryCode)

      logger.info("[NewsController] Perform dependency injection for UserController")

      const newsEngine = container.resolve<INewsEngine>("INewsEngine")
      logger.info("[NewsController] Perform dependency injection for UserController was successfully")


      const result = await newsEngine.addNews(params)
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
      else {
        throw error;
      }
    }
  }



}
export default { NewsController }





