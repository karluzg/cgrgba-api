import { Service } from "../../../domain/model/Service";
import { ResultTemplate } from "../../../infrestructure/template/ResultTemplate";

export class ServiceResult extends ResultTemplate {

    private services: Service[]

    constructor() {
        super();
        this.getSuccessfullyMessage();
    }


    public get getServices(): Service[] {
        return this.services;
    }
    public set setServices(services: Service[]) {
        this.services = services;
    }
}