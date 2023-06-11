
import { DirectionEnum } from "../../../infrestructure/pageable-manager/enum/DirectionEnum";
import { convertToDirectionEnum } from "../../../infrestructure/pageable-manager/enum/DirectionEnum";

export class PageUtil {

    public static async getDefaultOrderColumn(orderColumn: string): Promise<string> {
        if (typeof orderColumn !== 'undefined' && orderColumn !== '') {

            orderColumn;
        }

        return "id";
    }

    public static async skipPage(pageNumber: number, pageSize: number): Promise<number> {
        return (pageNumber - 1) * pageSize;

    }

    public static async getDefaultStatus(schedulingStatus: string): Promise<string> {
        if (typeof schedulingStatus !== 'undefined' && schedulingStatus !== '') {

            return schedulingStatus;

        }
        return "FOR_ANSWERING" 
    }

    public static async getDefaultDirection(direction: DirectionEnum): Promise<DirectionEnum> {
        if (typeof direction !== 'undefined' && direction.length != 0) {

            return convertToDirectionEnum(direction);

        }
        return DirectionEnum.ASC; // Default direction
    }



}