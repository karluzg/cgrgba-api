
import { AddNewSchedulingParams } from "../../../application/model/scheduling-manager/scheduling/params/AddNewSchedulingParams";
import { Scheduling } from "../../model/Scheduling";
import { ISchedulingEngineRepository } from "../../repository/ISchedulingEngineRepository";
import { SchedulingStatusEnum } from "../../model/enum/SchedulingStatusEnum";
import logger from "../../../infrestructure/config/logger";

export class SchedulingUtil {


    public static async validateCitizenSchedulingFeature(params: AddNewSchedulingParams, schedulingEngineRepository: ISchedulingEngineRepository): Promise<boolean> {

        logger.info("[AddNewSchedulingOperation] Searching citizen scheduling in the database...");

        const schedulings: Scheduling[] = await schedulingEngineRepository.findCitizenSchedulingInfo(params.getCitizenEmail);

        logger.info("[SchedulingUtil] Found scheduling list: ", schedulings);

        if (schedulings.length === 0) {
            logger.info("[AddNewSchedulingOperation] Citizen without scheduling");
            return false;
        }

        for (const scheduling of schedulings) {

            const verifyIfSameDateAndHour = await this.verifyIfSameDateAndHour(
                scheduling,
                params.getSchedulingDate,
                params.getSchedulingHour
            );

            const verifyIfSameServiceAndSameDateAndHour = await this.verifyIfSameServiceAndSameDateAndHour(
                scheduling,
                params.getSchedulingService,
                params.getSchedulingDate,
                params.getSchedulingHour
            );

            const verifyIfAnotherServiceAndSameDateAndHour = await this.verifyIfAnotherServiceAndSameDateAndHour(
                scheduling,
                scheduling.service,
                scheduling.schedulingDate,
                scheduling.chosenHour
            );

            const verifyIfSameServiceAndWaitingToAnswering = await this.verifyIfSameServiceAndWaitingToAnswering(
                scheduling,
                params.getSchedulingService
            );

            if (
                verifyIfSameDateAndHour ||
                verifyIfSameServiceAndSameDateAndHour ||
                verifyIfAnotherServiceAndSameDateAndHour ||
                verifyIfSameServiceAndWaitingToAnswering
            ) {
                return true;
            }
        }

        return false;

    }

    private static async verifyIfSameDateAndHour(schedulingDB: Scheduling,
        schedulingDateParams: string,
        chosenHourParams: string): Promise<boolean> {

        return schedulingDB.schedulingDate == schedulingDateParams
            && schedulingDB.chosenHour == chosenHourParams;


    }

    private static async verifyIfSameServiceAndSameDateAndHour(schedulingDB: Scheduling,
        serviceParams: string, schedulingDateParams:
            string, chosenHourParams: string): Promise<boolean> {


        return schedulingDB.service == serviceParams
            && schedulingDB.schedulingDate == schedulingDateParams
            && schedulingDB.chosenHour == chosenHourParams;
    }

    private static async verifyIfAnotherServiceAndSameDateAndHour(schedulingDB: Scheduling,
        serviceParams: string, schedulingDateParams: string,
        chosenHourParams: string): Promise<boolean> {


        return schedulingDB.service != serviceParams
            && schedulingDB.schedulingDate == schedulingDateParams
            && schedulingDB.chosenHour == chosenHourParams;


    }


    private static async verifyIfSameServiceAndWaitingToAnswering(schedulingDB: Scheduling,
        serviceParams: string): Promise<boolean> {

        return schedulingDB.service == serviceParams
            && schedulingDB.status == SchedulingStatusEnum.FOR_ANSWERING
    }



}