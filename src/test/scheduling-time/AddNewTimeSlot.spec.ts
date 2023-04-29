import 'reflect-metadata'
import { expect } from 'chai'
import { AddNewTimeSlotParams } from '../../engine-interface/params/scheduling-time/AddNewTimeSlotParams'
import axios from 'axios'

/*describe("Add new time slot", ()=>{
    it('"Should fail Http status code 501:with method not implemented ',async ()=>{
   
        const data=new Date();
        const hora=data.getHours();
        const epochTime=data.getTime()/1000;
        console.log(epochTime);
        console.log(data.getTime()*1000)

        const response = await axios.post("http://localhost:3000/users/create",
         new AddNewTimeSlotParams("token1234", new Date(), 12));

        expect(response.status).equal(501)
        expect(response.data).equal(JSON.stringify({message:"Method not implemented."}))

    })
})*/


describe("Add new time slot", () => {
    it("Should be successfully with Http status code 200", async () => {

        const data = new Date();
        console.log(data)
        const hora = data.getHours();
        const epochTime = data.getTime() / 1000;
        console.log(epochTime);
        console.log(data.getTime() * 1000)

        const response = await axios.post("http://localhost:3000/schedulingTimeHour/add",
            new AddNewTimeSlotParams("token1234", new Date(), 12));

        expect(response.status).equal(200)

    })
})