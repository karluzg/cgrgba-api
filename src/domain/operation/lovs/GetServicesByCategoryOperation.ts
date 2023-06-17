
import { container } from "tsyringe";
import { CategoryParams } from "../../../application/model/lovs/CategoryParams";
import { CategoryResult } from "../../../application/model/lovs/CategoryResult";
import { OperationTemplate } from "../../../infrestructure/template/OperationTemplate";
import { ISchedulingCategoryEngineRepository } from "../../repository/ISchedulingCategoryEngineRepository";
import { Service } from "../../model/Service";
import { OperationNamesEnum } from "../../model/enum/OperationNamesEnum";
import { SchedulingCategory } from "../../model/SchedulingCategory";
import { InvalidParametersException } from "../../../infrestructure/exceptions/InvalidParametersException";
import { Field } from "../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../infrestructure/response/enum/MiddlewareCustomMessage";

export class GetServicesByCategoryOperation extends OperationTemplate<CategoryResult, CategoryParams> {


    private readonly schedulingCategoryEngineRepository: ISchedulingCategoryEngineRepository;


    private services: Service[];
    private categoryEntity: SchedulingCategory[] = [];

    constructor() {
        super(OperationNamesEnum.SCHEDULING_SERVICE_GET)
        this.schedulingCategoryEngineRepository = container.resolve<ISchedulingCategoryEngineRepository>('ISchedulingCategoryEngineRepository')
    }

    protected async doValidateParameters(params: CategoryParams): Promise<void> {

        this.categoryEntity = await this.schedulingCategoryEngineRepository.findServiceByCategory(params.getCategoryCode);

        if (this.categoryEntity.length == 0) {
            throw new InvalidParametersException(Field.SCHEDULING_SERVICE,
                MiddlewareBusinessMessage.SCHEDULING_SERVICE_INVALID);
        }


    }
    protected async doExecute(params: CategoryParams, result: CategoryResult): Promise<void> {
        this.services = this.categoryEntity[0].services
        result.setServices = this.services;
    }
    protected initResult(): CategoryResult {
        return new CategoryResult();
    }


}