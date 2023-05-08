export class SchedulingTimeUtil {

    static async getBeginHourPart(beginWorkTime: string): Promise<number> {
        return parseInt(beginWorkTime.split(':')[0]);
    }
    static async getDateConverted(dateInput: string): Promise<Date> {
        return new Date(dateInput)
    }
}