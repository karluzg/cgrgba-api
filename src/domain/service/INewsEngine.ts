
import { PageAndSizeParams } from "../../application/model/PageAndSizeParams";
import { NewsFileParams } from "../../application/model/news-manager/NewsFileParams";
import { NewsParams } from "../../application/model/news-manager/NewsParams";
import { NewsResult } from "../../application/model/news-manager/NewsResult";
import { NewsResultList } from "../../application/model/news-manager/NewsResultList";
import { NewsCategoryResultList } from "../../application/model/news-manager/NewsCategoryResultList";
import { ResetPasswordParams } from "../../application/model/user-manager/ResetPasswordParams";
import { UpdatePasswordParams } from "../../application/model/user-manager/UpdatePasswordParams";
import { UserParams } from "../../application/model/user-manager/UserParams";
import { UserResult } from "../../application/model/user-manager/UserResult";
import { ResultTemplate } from "../../infrestructure/template/ResultTemplate";
import { GetAllNewsOperation } from "../operation/news-manager/GetAllNewsOperation";
import { NewsCategoryParams } from "../../application/model/news-manager/NewsCategoryParams";
import { NewsCategoryResult } from "../../application/model/news-manager/NewsCategoryResult";


export interface INewsEngine {
    addNews(params: NewsParams): Promise<NewsResult>;
    addNewsFile(params: NewsFileParams): Promise<NewsResult>;
    getAllNews(params: PageAndSizeParams): Promise<NewsResultList>;
    addNewsCategory(params: NewsCategoryParams): Promise<NewsCategoryResult>;
    getAllNewsCategory(params: PageAndSizeParams): Promise<NewsCategoryResultList>;
}