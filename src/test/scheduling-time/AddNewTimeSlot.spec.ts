import 'reflect-metadata'
import { expect } from 'chai'
import { AddTimeSlotParams } from '../../application/model/scheduling-manager/schedulingTime/params/AddTimeSlotParams'
import axios from 'axios'


describe("Add new time slot", () => {
    it("Should create scheduling time with status 200", async () => {


        const response = await axios.post("http://localhost:3000/slot",
            new AddTimeSlotParams("720409d4-331d-4190-938a-f93f90753096", new Date("2023-05-05"), null, "9:00", "18:00", "13:00", "14:30", 10, 3));

        expect(response.status).equal(200)

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
