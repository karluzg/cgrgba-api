export class SchedulingTimeUtil {

    static async getBeginHourPart(beginWorkTime: string): Promise<number> {
        return parseInt(beginWorkTime.split(':')[0]);
    }
}