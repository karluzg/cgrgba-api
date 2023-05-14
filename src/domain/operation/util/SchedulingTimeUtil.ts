import logger from "../../../infrestructure/config/logger";
import { IHollydayEngineRepository } from "../../repository/IHollydayEngineRepository";

export class SchedulingTimeUtil {

    static async getTimePart(hour: string): Promise<number> {
        if (typeof hour !== 'undefined' && hour !== '') {
            return parseInt(hour.split(':')[0]);
        }
    }

    static async getMinutePart(minute: string): Promise<number> {

        if (typeof minute !== 'undefined' && minute !== '') {


            return parseInt(minute.split(':')[1]);
        }
    }



    static async isweekend(inputDate: Date): Promise<boolean> {

        console.log("[AddNewTimeSlotOperation] Check if input date is weekend  %s", inputDate)
        const dayWeek = inputDate.getDay();
        return dayWeek === 0 || dayWeek === 6; // 0 = Sunday and 6 = saturday
    }

    static async isHollyDay(inputDate: Date, hollydayRepository: IHollydayEngineRepository, entityOperationName): Promise<boolean> {

        console.log(entityOperationName + " " + "Check if input date is hollyday %s", inputDate)

        const hollyDateEntity = await hollydayRepository.findByHollydayDate(inputDate)

        console.log(entityOperationName + " " + "hollyDateEntity %s", hollyDateEntity)

        if (hollyDateEntity) {

            return true;
        }

        return false;
    }

    static async getDateWithoutTime(inputDate: Date): Promise<string> {
        const year = inputDate.getFullYear();
        const month = inputDate.getMonth() + 1; // get month (Remember to add +1, why the months are based  in month)
        const day = inputDate.getDate();

        const dateKey = `${year}-${month}-${day}`
        return dateKey;

    }

    static async getDefaultCreationDateWithouTime(): Promise<string> {
        const year = new Date().getFullYear();
        const month = new Date().getMonth() + 1; // get month (Remember to add +1, why the months are based  in month)
        const day = new Date().getDate();

        const dateKey = `${year}-${month}-${day}`
        return dateKey;

    }

}