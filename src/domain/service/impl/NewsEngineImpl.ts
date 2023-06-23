import { PageAndSizeParams } from "../../../application/model/PageAndSizeParams";
import { NewsCategoryParams } from "../../../application/model/news-manager/NewsCategoryParams";
import { NewsCategoryResult } from "../../../application/model/news-manager/NewsCategoryResult";
import { NewsCategoryResultList } from "../../../application/model/news-manager/NewsCategoryResultList";
import { NewsFileParams } from "../../../application/model/news-manager/NewsFileParams";
import { NewsParams } from "../../../application/model/news-manager/NewsParams";
import { NewsResult } from "../../../application/model/news-manager/NewsResult";
import { NewsResultList } from "../../../application/model/news-manager/NewsResultList";
import { GenericOperationTemplate } from "../../../infrestructure/template/GenericOperationTemplate";
import { AddNewsCategoryOperation } from "../../operation/news-manager/AddNewsCategoryOperation";
import { AddNewsFileOperation } from "../../operation/news-manager/AddNewsFileOperation";
import { AddNewsOperation } from "../../operation/news-manager/AddNewsOperation";
import { GetAllNewsCategoryOperation } from "../../operation/news-manager/GetAllNewsCategoryOperation";
import { GetAllNewsOperation } from "../../operation/news-manager/GetAllNewsOperation";
import { INewsEngine } from "../INewsEngine";


export class NewsEngineImpl extends GenericOperationTemplate implements INewsEngine {
    async addNewsCategory(params: NewsCategoryParams): Promise<NewsCategoryResult> {
        return await this.executeOperation(new AddNewsCategoryOperation(), params)
    }
    async getAllNewsCategory(params: PageAndSizeParams): Promise<NewsCategoryResultList> {
        return await this.executeOperation(new GetAllNewsCategoryOperation(), params)
    }
    async getAllNews(params: PageAndSizeParams): Promise<NewsResultList> {
        return await this.executeOperation(new GetAllNewsOperation(), params)
    }
    async addNewsFile(params: NewsFileParams): Promise<NewsResult> {
        return await this.executeOperation(new AddNewsFileOperation(), params)
    }
    async addNews(params: NewsParams): Promise<NewsResult> {
        return await this.executeOperation(new AddNewsOperation(), params)
    }
}
