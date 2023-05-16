import { NewsFileParams } from "../../../application/model/news-manager/NewsFileParams";
import { NewsParams } from "../../../application/model/news-manager/NewsParams";
import { NewsResult } from "../../../application/model/news-manager/NewsResult";
import { GenericOperationTemplate } from "../../../infrestructure/template/GenericOperationTemplate";
import { AddNewsFileOperation } from "../../operation/news-manager/AddNewsFileOperation";
import { AddNewsOperation } from "../../operation/news-manager/AddNewsOperation";
import { INewsEngine } from "../INewsEngine";


export class NewsEngineImpl extends GenericOperationTemplate implements INewsEngine {
    async addNewsFile(params: NewsFileParams): Promise<NewsResult> {
        return await this.executeOperation(new AddNewsFileOperation(), params)
    }
    async addNews(params: NewsParams): Promise<NewsResult> {
        return await this.executeOperation(new AddNewsOperation(), params)
    }
}
