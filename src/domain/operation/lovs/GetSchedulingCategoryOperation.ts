import { container } from "tsyringe";
import { CategoryResult } from "../../../application/model/lovs/CategoryResult";
import { ServiceResult } from "../../../application/model/lovs/ServiceResult";
import { CategoryParams } from "../../../application/model/lovs/params/CategoryParams";
import { ServiceParams } from "../../../application/model/lovs/params/ServiceParams";
import { InvalidParametersException } from "../../../infrestructure/exceptions/InvalidParametersException";
import { Field } from "../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../infrestructure/response/enum/MiddlewareCustomMessage";
import { OperationTemplate } from "../../../infrestructure/template/OperationTemplate";
import { SchedulingCategory } from "../../model/SchedulingCategory";
import { OperationNamesEnum } from "../../model/enum/OperationNamesEnum";
import { ISchedulingCategoryEngineRepository } from "../../repository/ISchedulingCategoryEngineRepository";

export class GetSchedulingCategoryOperation extends OperationTemplate<CategoryResult, CategoryParams> {


    private readonly schedulingCategoryEngineRepository: ISchedulingCategoryEngineRepository;


    private categoryEntity: SchedulingCategory[] = [];

    constructor() {
        super(OperationNamesEnum.SCHEDULING_GET_GETEGORY)
        this.schedulingCategoryEngineRepository = container.resolve<ISchedulingCategoryEngineRepository>('ISchedulingCategoryEngineRepository')
    }

 
    protected async doExecute(params: CategoryParams, result: CategoryResult): Promise<void> {
        this.categoryEntity = await this.schedulingCategoryEngineRepository.findAllCategory();
      
        result.setCategories = this.categoryEntity;
    }

    protected initResult(): CategoryResult {
        return new CategoryResult();
    }

}