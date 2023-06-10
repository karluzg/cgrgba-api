
import { Scheduling } from "../../model/Scheduling";
import { ISchedulingEngineRepository } from "../../repository/ISchedulingEngineRepository";
import { SchedulingStatusEnum } from "../../model/enum/SchedulingStatusEnum";
import logger from "../../../infrestructure/config/logger";
import { InvalidParametersException } from "../../../infrestructure/exceptions/InvalidParametersException";
import { Field } from "../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../infrestructure/response/enum/MiddlewareCustomMessage";
import { SchedulingTimeUtil } from "./SchedulingTimeUtil";
import { IHollydayEngineRepository } from "../../repository/IHollydayEngineRepository";
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
import { EncryptTemplate } from "../../../infrestructure/template/EncryptTemplate";




export class SchedulingUtil {

    public static async validateCitizenSchedulingFeature(schedulingDate: string,
        schedulingHour: string,
        serviceCodeInput: string,
        citizenEmail: string,
        schedulingEngineRepository: ISchedulingEngineRepository): Promise<boolean> {


        logger.info("[AddNewSchedulingOperation] Searching citizen scheduling in the database...");

        const email = EncryptTemplate.encryptColumn(citizenEmail)

        const schedulings: Scheduling[] = await schedulingEngineRepository.findCitizenSchedulingInfo(email);

        logger.info("[SchedulingUtil] Found scheduling list: ", schedulings);
        console.info("[SchedulingUtil] Found scheduling list: ", schedulings);


        if (schedulings.length === 0) {
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
                serviceCodeInput,
                schedulingDate,
                schedulingHour
            );

            const verifyIfAnotherServiceAndSameDateAndHour = await this.verifyIfAnotherServiceAndSameDateAndHour(
                scheduling,
                scheduling.service.code,
                scheduling.date,
                scheduling.chosenHour
            );

            const verifyIfSameServiceAndWaitingToAnswering = await this.verifyIfSameServiceAndWaitingToAnswering(
                scheduling,
                serviceCodeInput);

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


        return schedulingDB.service.code == serviceParams
            && schedulingDB.date == schedulingDateParams
            && schedulingDB.chosenHour == chosenHourParams;
    }

    private static async verifyIfAnotherServiceAndSameDateAndHour(schedulingDB: Scheduling,
        serviceParams: string, schedulingDateParams: string,
        chosenHourParams: string): Promise<boolean> {


        return schedulingDB.service.name != serviceParams
            && schedulingDB.date == schedulingDateParams
            && schedulingDB.chosenHour == chosenHourParams;
    }


    private static async verifyIfSameServiceAndWaitingToAnswering(schedulingDB: Scheduling,
        serviceParams: string): Promise<boolean> {

        return schedulingDB.service.name == serviceParams
            && schedulingDB.status.code == SchedulingStatusEnum.FOR_ANSWERING
    }


    public static async checkIfSlotAvailabe(schedulingDate: string,
        chosenHour: string,
        schedulingHistoryEngineResitory: ISchedulingHistoryEngineRepository): Promise<boolean> {


        logger.info("[AddNewSchedulingOperation] Verify available date and hour to schedule...")

        return await schedulingHistoryEngineResitory
            .checkIfSchedulingHistoryExist(schedulingDate, chosenHour);

    }

    public static async isTobeBlockDateAndHour(scheduling: Scheduling,
        availableCollaboratorNumber: number,
        schedulingHistoryEngineRepository: ISchedulingEngineRepository,
        schedulingHistoryEngineRespository: ISchedulingHistoryEngineRepository): Promise<void> {

        logger.info("[AddNewSchedulingOperation] Begin validate is to be block date and hour... ")

        const schedulings: Scheduling[] = await schedulingHistoryEngineRepository
            .findBeginDateAndHour(scheduling.date, scheduling.chosenHour);

        logger.info("[AddNewSchedulingOperation] Schedulings returned by date and hour %s", schedulings)

        const totalnumberOfScehduling = schedulings.length;

        logger.info("[AddNewSchedulingOperation] Total Number of scehduling returned %s", totalnumberOfScehduling)
        logger.info("[AddNewSchedulingOperation] Total available collaborator number %s", availableCollaboratorNumber)


        if (totalnumberOfScehduling == availableCollaboratorNumber) {

            await this.lockingDateAndHour(scheduling, schedulingHistoryEngineRespository)

        }
        logger.info("[AddNewSchedulingOperation] End validate is to be block date and hour... ")
    }

    private static async lockingDateAndHour(scheduling: Scheduling, schedulingHistoryEngineRespository: ISchedulingHistoryEngineRepository) {

        logger.info("[AddNewSchedulingOperation] Begin adding scheduling history in Data Base...")

        const newSchedulingHistory = new SchedulingHistory();
        newSchedulingHistory.creationDate = new Date();
        newSchedulingHistory.date = scheduling.date;
        newSchedulingHistory.chosenHour = scheduling.chosenHour;
        newSchedulingHistory.scheduling = scheduling
        newSchedulingHistory.available = false;

        await schedulingHistoryEngineRespository.save(newSchedulingHistory)
    }



    public static async sendSchedulingByEmail(scheduling: Scheduling): Promise<void> {

        const emailMessage = await EmailUtils.generateSchedulingEmailBody(scheduling.citizen.fullName,
            scheduling.date, scheduling.chosenHour, scheduling.service.name)


        const emailTemplate = new EmailTemplate();
        const mailOption = await emailTemplate.createMailOption(scheduling.citizen.email, emailMessage);

        await emailTemplate.sendEmail(mailOption);
    }

    public static async validateServiceMatchCategory(categoryInput: string, serviceCodeInput: string,


        schedulingCategoryEngineRepository: ISchedulingCategoryEngineRepository): Promise<Service> {

        logger.info("[AddNewSchedulingOperation] Verify if if the service match the category...")


        const categoryEntity: SchedulingCategory[] = await schedulingCategoryEngineRepository.findServiceByCategory(categoryInput);


        if (categoryEntity.length == 0) {
            throw new InvalidParametersException(Field.SCHEDULING_CATEGORY,
                MiddlewareBusinessMessage.SCHEDULING_CATEGORY_INVALD);
        }


        let serviceEntity: Service | undefined;

        for (const category of categoryEntity) {
            const services = category.services;

            for (const service of services) {
                if (service.code === serviceCodeInput) {
                    serviceEntity = service;
                    break;
                }
            }

            if (serviceEntity) {
                break;
            }
        }

        if (!serviceEntity) {
            throw new InvalidParametersException(
                Field.SCHEDULING_SERVICE,
                MiddlewareBusinessMessage.SCHEDULING_SERVICE_INVALID
            );
        }

        return serviceEntity;
    }


    public static async strictSchedulingValidate(
        schedulingDate: string,
        schedulingHour: string,
        serviceCodeInput: string,
        citizen: Citizen,
        hollydayEngineRepository: IHollydayEngineRepository,
        schedulingTimeEngineRepository: ISchedulingTimeEngineRepository,
        schedulingEngineRepository: ISchedulingEngineRepository,
    ): Promise<number> {


        console.info("[AddNewSchedulingOperation] Citizen was found:", citizen);
        logger.info("[AddNewSchedulingOperation] Verifying if scheduling date is a weekend or holiday: " + schedulingDate);



        const schedulingDateInput = new Date(schedulingDate);
        const isWeekend = await SchedulingTimeUtil.isweekend(schedulingDateInput);
        const isHoliday = await SchedulingTimeUtil.isHollyDay(schedulingDateInput, hollydayEngineRepository, "[AddNewSchedulingOperation]");

        if (isWeekend || isHoliday) {
            throw new InvalidParametersException(Field.SCHEDULING_TIME_DATE, MiddlewareBusinessMessage.SCHEDULING_TIME_DATE_CONFIG_NOT_EXIST);
        }

        logger.info("[AddNewSchedulingOperation] Validating if time configuration for the input date exists: " + schedulingDateInput);

        const schedulingTimeEntity: SchedulingTimeConfiguration[] = await schedulingTimeEngineRepository.findBySchedulingDate(schedulingDateInput);

        logger.info("Scheduling entity founded " + JSON.stringify(schedulingTimeEntity));

        if (schedulingTimeEntity.length === 0) {
            throw new InvalidParametersException(Field.SCHEDULING_TIME_DATE, MiddlewareBusinessMessage.SCHEDULING_TIME_DATE_CONFIG_NOT_EXIST);
        }

        logger.info("[AddNewSchedulingOperation] Scheduling entity was found");

        logger.info("[AddNewTimeSlotOperation] Validating valid Pair -> SchedulingDate and hour");
        const matchHours: string[] = schedulingTimeEntity
            .flatMap(schedulingTime => schedulingTime.hours)
            .map(hour => hour.value)
            .filter(value => value === schedulingHour);

        if (matchHours.length === 0) {
            throw new InvalidParametersException(Field.SCHEDULING_HOUR, MiddlewareBusinessMessage.SCHEDULING_AVAILABLE);
        }

        logger.info("[AddNewSchedulingOperation] Verifying if begin date is earlier than the current date...");

        const beginDate = new Date(schedulingDate);
        const currentDate = new Date();

        if (beginDate < currentDate) {
            throw new InvalidParametersException(Field.SCHEDULING_TIME_BEGIN_SCHEDULING_DATE, MiddlewareBusinessMessage.SCHEDULING_AVAILABLE);
        }

        logger.info("[AddNewSchedulingOperation] Begin searching Citizen by email to start validation of scheduling features...");

        logger.info("[AddNewSchedulingOperation] Citizen was found:", citizen);


        if (citizen) {

            logger.info("[AddNewSchedulingOperation] Begin validating scheduling features for citizen...");

            const isNotValidSchedulingFeature = await SchedulingUtil.validateCitizenSchedulingFeature(
                schedulingDate,
                schedulingHour,
                serviceCodeInput,
                citizen.email,
                schedulingEngineRepository
            );

            logger.info("[AddNewSchedulingOperation] Watch the validation scheduling feature output:", isNotValidSchedulingFeature);

            if (isNotValidSchedulingFeature) {
                throw new InvalidParametersException(Field.SYSTEM, MiddlewareBusinessMessage.SCHEDULING_ALREADY_EXIST);
            }
        }

        return schedulingTimeEntity[0].availableCollaboratorNumber;

    }
}





