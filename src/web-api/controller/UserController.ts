
import {IUserEngine} from "../../engine-interface/IUserEngine";
import { RegisterUserParams } from "../../engine-interface/params/user/RegisterUserParams";
import { Request, Response } from "express";
import { injectable } from "tsyringe";
import logger from "../../common/config/logger";
import { container } from "tsyringe";

 export  class UserController {
     
  public async registerUser(request: Request, response: Response): Promise<Response> {
    
    const { userFullName, userMobileNumber, userEmail} = request.body;

    const params=new RegisterUserParams(userFullName,userMobileNumber,userEmail)
   
   const engine =container.resolve<IUserEngine>("IUserEngine")
   logger.info("CHEGOU NA API")
      
   logger.info(JSON.stringify(engine))
    
    const  result= await engine.create_user(params)

    return response.json(result);
  }
}

export default {UserController}

    