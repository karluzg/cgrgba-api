import 'reflect-metadata'
import { expect } from 'chai'
import { AddNewTimeSlotParams } from '../../engine-interface/params/scheduling-time/AddNewTimeSlotParams'
import axios from 'axios'
import { ISchedulingTimeHourEngine } from '../../engine-interface/services/ISchedulingTimeHourEngine'

describe("Add new time slot", () => {
    it("Should fail Http status code 401: User does not have a valid token", async () => {
   
        const data=new Date();
        const hora=data.getHours();
        const epochTime=data.getTime()/1000;
        console.log(epochTime);
        console.log(data.getTime()*1000)

        const response = await axios.post("http://localhost:3000/slot",
         new AddNewTimeSlotParams("token1234", new Date(), 12));

        expect(response.status).equal(401)

    })
})


/*describe("Add new time slot", () => {
    it("Should be successfully with Http status code 200", async () => {

        const data = new Date();
        console.log(data)
        const hora = data.getHours();
        const epochTime = data.getTime() / 1000;
        console.log(epochTime);
        console.log(data.getTime() * 1000)

        const response = await axios.post("http://localhost:3000/slot",
            new AddNewTimeSlotParams("8a6e0804-2bd0-4672-b79d-d97027f9071a", new Date(), 12));

        expect(response.status).equal(200)

    })*/
