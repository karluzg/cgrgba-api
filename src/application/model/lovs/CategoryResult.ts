import { Service } from "../../../domain/model/Service";
import { ResultTemplate } from "../../../infrestructure/template/ResultTemplate";

export class CategoryResult extends ResultTemplate {

    private services: Service[]


    public get getServices(): Service[] {
        return this.services;
    }
    public set setServices(services: Service[]) {
        this.services = services;
    }
}