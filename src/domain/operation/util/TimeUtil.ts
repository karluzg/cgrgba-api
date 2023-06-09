
import { IHollydayEngineRepository } from "../../repository/IHollydayEngineRepository";
import { isValid, parseISO } from "date-fns";

export class TimeUtil {

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

        const dayWeek = inputDate.getDay();
        return dayWeek === 0 || dayWeek === 6; // 0 = Sunday and 6 = saturday
    }

    static async isHollyDay(inputDate: Date, hollydayRepository: IHollydayEngineRepository, entityOperationName: string): Promise<boolean> {

    
        const hollyDateEntity = await hollydayRepository.findByHollydayDate(inputDate)

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

    static async getGreet(): Promise<string> {

        const currentHour = new Date().getHours();

        let greeting;

        if (currentHour >= 5 && currentHour < 12) {
            greeting = 'Bom dia, Senhor(a)';
        } else if (currentHour >= 12 && currentHour < 18) {
            greeting = 'Boa tarde, Senhor(a)';
        } else {
            greeting = 'Boa noite, Senhor(a)';
        }

        return greeting;
    }

    public static async isValidDate(date: string): Promise<boolean> {

        const parsedDate = parseISO(date);
        return isValid(parsedDate)
    }

    public static async formatDate(date: string): Promise<string> {
        
        const monthsInFull = [
            "", // Index 0 is not used to facilitate direct access to months
            "janeiro",
            "fevereiro",
            "março",
            "abril",
            "maio",
            "junho",
            "julho",
            "agosto",
            "setembro",
            "outubro",
            "novembro",
            "dezembro"
          ];
        
          const parts = date.split("-");
          const day = parts[2];
          const numberOfMonths = Number(parts[1]);
          const month = monthsInFull[numberOfMonths];
          const yer = parts[0];
        
          const dateFormat = `Dia ${day} de ${month} de ${yer}`;
          return dateFormat;
        }


}