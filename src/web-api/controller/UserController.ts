import * as express from "express";

import { UserEngineImpl } from "../../engine-interface-impl/impl/UserEngineImpl";
import { RegisterUserParams } from "../../engine-interface/params/user/RegisterUserParams";


const userserviceimpl = new UserEngineImpl()

const router=express.Router()

router.post("",async function (req, res) {
    
    const params=new RegisterUserParams(req.body.userFullName, req.body.userMobileNumber,
      req.body.userEmail)
    const  result=  userserviceimpl.create_user(params)
      

    return res.json(result);

})

module.exports=router;

    