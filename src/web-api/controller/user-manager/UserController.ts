
import logger from "../../../common/config/logger";
import { NotImplementedException } from "../../../common/exceptions/NotImplementedException";
import { InvalidParametersException } from "../../../common/exceptions/InvalidParametersException";
import { UnauthorizedOperationException } from "../../../common/exceptions/UnauthorizedOperationException";

import { HttpCode } from "../../../common/response/HttpCode";
import {IUserEngine} from "../../../engine-interface/IUserEngine";
import { RegisterUserParams } from "../../../engine-interface/params/user/RegisterUserParams";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ErrorExceptionClass } from "../../../common/exceptions/ErrorExceptionClass";


 export class UserController {
     
  public registerUser(request: Request, response: Response): Response {
   

    const { authenticationToken, userFullName, userMobileNumber, userEmail} = request.body;

    const params=new RegisterUserParams(authenticationToken,userFullName,userMobileNumber,userEmail)
   
   const userEngine =container.resolve<IUserEngine>("IUserEngine")
  try {
    const result= userEngine.register_user(params)
    return response.status(HttpCode.OK).json(result)
  } catch (error) {
   
      if(error.errorClasse===ErrorExceptionClass.NOT_IMPLEMENTED){
      throw new NotImplementedException(error.message)
  
        }else if(error.errorClasse===ErrorExceptionClass.INVALID_PARAMETERS){
            throw new InvalidParametersException(error.message)

        }else if(error.errorClasse===ErrorExceptionClass.UNAUTHORIZED){
        throw new UnauthorizedOperationException(error.message)
        }
      }
      }
 }
 export default {UserController}

 


 
    