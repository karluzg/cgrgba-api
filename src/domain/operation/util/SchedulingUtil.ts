
import { Scheduling } from "../../model/Scheduling";
import { ISchedulingEngineRepository } from "../../repository/ISchedulingEngineRepository";
import { SchedulingStatusEnum } from "../../model/enum/SchedulingStatusEnum";
import logger from "../../../infrestructure/config/logger";
import { SchedulingParams } from "../../../application/model/scheduling-manager/scheduling/SchedulingParams";
import { InvalidParametersException } from "../../../infrestructure/exceptions/InvalidParametersException";
import { Field } from "../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../infrestructure/response/enum/MiddlewareCustomErrorMessage";
import { SchedulingTimeUtil } from "./SchedulingTimeUtil";
import { ICitizenEngineRepository } from "../../repository/ICitizenEngineRepository";
import { IHollydayEngineRepository } from "../../repository/IHollydayEngineRepository";
import { SchedulingTimeEngineRepositoryImpl } from "../../repository/impl/SchedulingTimeEngineRepositoryImpl";
import { ISchedulingTimeEngineRepository } from "../../repository/ISchedulingTimeEngineRepository";
import { SchedulingTimeConfiguration } from "../../model/SchedulingTimeConfiguration";
import { Citizen } from "../../model/Citizen";
import { ISchedulingHistoryEngineRepository } from "../../repository/ISchedulingHistoryEngineRespository";
import { SchedulingHistory } from "../../model/SchedulingHistory";
import { EmailUtils } from "./EmailUtils";
import { EmailTemplate } from "../../../infrestructure/template/EmailTemplate";
import { ISchedulingCategoryEngineRepository } from "../../repository/ISchedulingCategoryEngineRepository";
import { SchedulingCategory } from "../../model/SchedulingCategory";
import { Service } from "../../model/Service";

export class SchedulingUtil {


    public static async validateCitizenSchedulingFeature(schedulingDate: string,
        schedulingHour: string,
        schedulingService: string,
        citizenEmail: string,
        schedulingEngineRepository: ISchedulingEngineRepository): Promise<boolean> {

        logger.info("[AddNewSchedulingOperation] Searching citizen scheduling in the database...");

        const schedulings: Scheduling[] = await schedulingEngineRepository.findCitizenSchedulingInfo(citizenEmail);

        logger.info("[SchedulingUtil] Found scheduling list: ", schedulings);

        if (schedulings.length === 0) {
            logger.info("[AddNewSchedulingOperation] Citizen without scheduling");
            return false;
        }

        for (const scheduling of schedulings) {

            const verifyIfSameDateAndHour = await this.verifyIfSameDateAndHour(
                scheduling,
                schedulingDate,
                schedulingHour
            );

            const verifyIfSameServiceAndSameDateAndHour = await this.verifyIfSameServiceAndSameDateAndHour(
                scheduling,
                schedulingService,
                schedulingDate,
                schedulingHour
            );

            const verifyIfAnotherServiceAndSameDateAndHour = await this.verifyIfAnotherServiceAndSameDateAndHour(
                scheduling,
                scheduling.service,
                scheduling.date,
                scheduling.chosenHour
            );

            const verifyIfSameServiceAndWaitingToAnswering = await this.verifyIfSameServiceAndWaitingToAnswering(
                scheduling,
                schedulingService);

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

        return schedulingDB.date == schedulingDateParams
            && schedulingDB.chosenHour == chosenHourParams;


    }

    private static async verifyIfSameServiceAndSameDateAndHour(schedulingDB: Scheduling,
        serviceParams: string, schedulingDateParams:
            string, chosenHourParams: string): Promise<boolean> {


        return schedulingDB.service == serviceParams
            && schedulingDB.date == schedulingDateParams
            && schedulingDB.chosenHour == chosenHourParams;
    }

    private static async verifyIfAnotherServiceAndSameDateAndHour(schedulingDB: Scheduling,
        serviceParams: string, schedulingDateParams: string,
        chosenHourParams: string): Promise<boolean> {


        return schedulingDB.service != serviceParams
            && schedulingDB.date == schedulingDateParams
            && schedulingDB.chosenHour == chosenHourParams;


    }


    private static async verifyIfSameServiceAndWaitingToAnswering(schedulingDB: Scheduling,
        serviceParams: string): Promise<boolean> {

        return schedulingDB.service == serviceParams
            && schedulingDB.status == SchedulingStatusEnum.FOR_ANSWERING
    }


    public static async checkIfSlotAvailabe(schedulingDate: string,
        chosenHour: string,
        availableColaboratorNumber: number,
        schedulingHistoryEngineRepository: ISchedulingHistoryEngineRepository): Promise<boolean> {


        logger.info("[AddNewSchedulingOperation] Verify available date and hour to schedule...")

        const schedulings: SchedulingHistory[] = await schedulingHistoryEngineRepository
            .countNumberOfSchedulingByDateandHour(schedulingDate, chosenHour)

        logger.info("[AddNewSchedulingOperation] Schedulings entity founded %s", JSON.stringify(schedulings))

        const numberOfScehdulingByDateAndHour = schedulings.length;


        return numberOfScehdulingByDateAndHour >= availableColaboratorNumber

    }

    public static async isTobeBlockDateAndHour(schedulingDate: string,
        chosenHour: string,
        availableCollaboratorNumber: number,
        schedulingHistoryEngineRepository: ISchedulingHistoryEngineRepository): Promise<void> {

        logger.info("[AddNewSchedulingOperation] Begin validate is to be block date and hour... ")
        const schedulings: SchedulingHistory[] = await schedulingHistoryEngineRepository
            .countNumberOfSchedulingByDateandHour(schedulingDate, chosenHour);

        logger.info("[AddNewSchedulingOperation] Schedulings returned by date and hour %s", schedulings)

        const totalnumberOfScehduling = schedulings.length;

        logger.info("[AddNewSchedulingOperation] Total Number of scehduling returned %s", totalnumberOfScehduling)
        logger.info("[AddNewSchedulingOperation] Total available collaborator number %s", availableCollaboratorNumber)

        if (totalnumberOfScehduling == availableCollaboratorNumber) {
            await schedulingHistoryEngineRepository.blockDateAndHour(schedulingDate, chosenHour);
        }
    }


    public static async sendSchedulingByEmail(scheduling: Scheduling): Promise<void> {

        const emailMessage = await EmailUtils.generateSchedulingEmailBody(scheduling.citizen.fullName,
            scheduling.date, scheduling.chosenHour, scheduling.hour, scheduling.service)


        const emailTemplate = new EmailTemplate();
        const mailOption = await emailTemplate.createMailOption(scheduling.citizen.email, emailMessage);

        await emailTemplate.sendEmail(mailOption);
    }



    public static async strictSchedulingValidate(
        schedulingDate: string,
        schedulingHour: string,
        serviceCodeInput: string,
        categoryCodeInput: string,
        citizenEmail: string,
        citizenNumber: string,
        citizenEngineRepository: ICitizenEngineRepository,
        hollydayEngineRepository: IHollydayEngineRepository,
        schedulingTimeEngineRepository: ISchedulingTimeEngineRepository,
        schedulingEngineRepository: ISchedulingEngineRepository,
        schedulingCategoryEngineRepository: ISchedulingCategoryEngineRepository
    ): Promise<number> {


        logger.info("[AddNewSchedulingOperation] Verify scheduling date is weekend or hollyday:" + schedulingDate)


        const schedulingDateInput = new Date(schedulingDate);

        console.info("INPUT DATE CONVERTED:" + schedulingDateInput)

        const isWeekend = await SchedulingTimeUtil.isweekend(schedulingDateInput);

        const isHollyday = await SchedulingTimeUtil.isHollyDay(schedulingDateInput, hollydayEngineRepository,
            "[AddNewSchedulingOperation]")


        if (isWeekend || isHollyday) {
            throw new InvalidParametersException(Field.SCHEDULING_TIME_DATE,
                MiddlewareBusinessMessage.SCHEDULING_TIME_DATE_CONFIG_NOT_EXIST);
        }



        logger.info("[AddNewSchedulingOperation] validate if time configuration for the input date exist %" + schedulingDateInput)

        console.info("[AddNewSchedulingOperation] validate if time configuration for the input date exist %" + schedulingDateInput)

        const schedulingTimeEntity: SchedulingTimeConfiguration[] = await schedulingTimeEngineRepository.findBySchedulingDate(schedulingDateInput)

        logger.info("[AddNewSchedulingOperation] Scheduling entity founded: %s", schedulingTimeEntity)
        console.info("[AddNewSchedulingOperation] Scheduling entity founded: %s", JSON.stringify(schedulingTimeEntity))


        if (schedulingTimeEntity.length == 0) {
            throw new InvalidParametersException(Field.SCHEDULING_TIME_DATE, MiddlewareBusinessMessage.SCHEDULING_TIME_DATE_CONFIG_NOT_EXIST);
        }


        logger.info("[AddNewTimeSlotOperation] Validate valid Pair -> SchedulinDate and hour")
        const matchHours: string[] = schedulingTimeEntity
            .flatMap(schedulingTime => schedulingTime.hours)
            .map(hour => hour.value)
            .filter(value => value === schedulingHour);

        console.info("MATCH HOURS:", matchHours);

        if (matchHours.length === 0) {
            throw new InvalidParametersException(Field.SCHEDULING_HOUR,
                MiddlewareBusinessMessage.SCHEDULING_TIME_HOUR_CONFIG_NOT_EXIST);
        }

        logger.info("[AddNewSchedulingOperation] Verify if if the service match the category...")

        const categoryEntity: SchedulingCategory[] = await schedulingCategoryEngineRepository.findServiceByCategory(categoryCodeInput);

        if (categoryEntity.length === 0) {
            throw new InvalidParametersException(Field.SCHEDULING_CATEGORY,
                MiddlewareBusinessMessage.SCHEDULING_CATEGORY_INVALD);
        }

        const matchService: string[] = categoryEntity.flatMap(category => category.services)
            .map(service => service.code)
            .filter(serviceCodeBd => serviceCodeBd === serviceCodeInput)


        if (matchService.length === 0) {
            throw new InvalidParametersException(Field.SCHEDULING_SERVICE,
                MiddlewareBusinessMessage.SCHEDULING_SERVICE_INVALID);
        }



        logger.info("[AddNewSchedulingOperation] Verify if begin date is less than the current date...")


        const beginDate = new Date(schedulingDate);

        const currentDate = new Date();

        if (beginDate <= currentDate) {
            throw new InvalidParametersException(Field.SCHEDULING_TIME_BEGIN_SCHEDULING_DATE,
                MiddlewareBusinessMessage.SCHEDULING_TIME_BEGIN_SCHEDULING_DATE_GREATHER_THAN_CURRENT_DATE)
        }


        logger.info("[AddNewSchedulingOperation] Begin searching Citizen by email to satrt validation of scheduling features...")

        const citizen: Citizen = await citizenEngineRepository.findCitizenByEmailOrMobileNumber(citizenEmail,
            citizenNumber);

        logger.info("[AddNewSchedulingOperation] Citizen was founded %", citizen);

        if (citizen) {

            logger.info("[AddNewSchedulingOperation] Begin validate scheduling features for citizen...")

            const isNotValidchedulingFeature = await SchedulingUtil.validateCitizenSchedulingFeature(schedulingDate, schedulingHour, serviceCodeInput,
                citizenEmail,
                schedulingEngineRepository);

            logger.info("[AddNewSchedulingOperation]  Watch the validatio scheduling feature output:", isNotValidchedulingFeature)

            if (isNotValidchedulingFeature) {
                throw new InvalidParametersException(Field.SYSTEM, MiddlewareBusinessMessage.SCHEDULING_ALREADY_EXIST);
            }

            let totalAvailableCollaborators: number = 0
            for (const scheduling of schedulingTimeEntity) {
                totalAvailableCollaborators = scheduling.availableCollaboratorNumber;
                break;
            }

            return totalAvailableCollaborators;


        }

    }

}