
import { container } from "tsyringe";
import { ServiceResult } from "../../../application/model/lovs/ServiceResult";
import { OperationTemplate } from "../../../infrestructure/template/OperationTemplate";
import { ISchedulingCategoryEngineRepository } from "../../repository/ISchedulingCategoryEngineRepository";
import { Service } from "../../model/Service";
import { OperationNamesEnum } from "../../model/enum/OperationNamesEnum";
import { SchedulingCategory } from "../../model/SchedulingCategory";
import { ServiceParams } from "../../../application/model/lovs/params/ServiceParams";

export class GetServicesByCategoryOperation extends OperationTemplate<ServiceResult, ServiceParams> {


    private readonly schedulingCategoryEngineRepository: ISchedulingCategoryEngineRepository;


    private services: Service[]=[];
    private categoryEntity: SchedulingCategory[] = [];

    constructor() {
        super(OperationNamesEnum.SCHEDULING_SERVICE_GET)
        this.schedulingCategoryEngineRepository = container.resolve<ISchedulingCategoryEngineRepository>('ISchedulingCategoryEngineRepository')
    }


    protected async doExecute(params: ServiceParams, result: ServiceResult): Promise<void> {
        this.categoryEntity = await this.schedulingCategoryEngineRepository.findServiceByCategory(params.getCategoryCode);

        if (this.categoryEntity.length == 0) {
            result.setServices = this.services;
        } else {
            this.services = this.categoryEntity[0].services
        
            this.services.sort((a, b) => a.code.localeCompare(b.code));
            
            result.setServices = this.services;
        }
    }
    protected initResult(): ServiceResult {
        return new ServiceResult();
    }


}