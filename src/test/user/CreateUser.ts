import 'reflect-metadata'
import {expect} from 'chai'
import axios from 'axios'
import { UserParams } from '../../application/model/user-manager/UserParams'

describe("Create new user", ()=>{
    it('Should fail with method not implemented and Http status code 501',async ()=>{
   
   
        const data=new Date();
        const hora=data.getHours();
        const epochTime=data.getTime()/1000;
        console.log(epochTime);
        console.log(data.getTime()*1000)

        const response = await axios.post("http://localhost:3000/users",
         new UserParams("233444", "Duarte Silva", "000000000","duarte@hotmail.com") );

        expect(response.status).equal(501)
        expect(response.data).equal(JSON.stringify({message:"Method not implemented."}))
    })
})