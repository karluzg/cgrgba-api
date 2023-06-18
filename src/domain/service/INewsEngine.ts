import { GetAllUsersParams } from "../../application/model/GetAllUserSParams";
import { NewsFileParams } from "../../application/model/news-manager/NewsFileParams";
import { NewsParams } from "../../application/model/news-manager/NewsParams";
import { NewsResult } from "../../application/model/news-manager/NewsResult";
import { NewsResultList } from "../../application/model/news-manager/NewsResultList";
import { ResetPasswordParams } from "../../application/model/user-manager/ResetPasswordParams";
import { UpdatePasswordParams } from "../../application/model/user-manager/UpdatePasswordParams";
import { UserParams } from "../../application/model/user-manager/UserParams";
import { UserResult } from "../../application/model/user-manager/UserResult";
import { ResultTemplate } from "../../infrestructure/template/ResultTemplate";


export interface INewsEngine {
    addNews(params: NewsParams): Promise<NewsResult>;
    addNewsFile(params: NewsFileParams): Promise<NewsResult>;
    getAllNews(params: GetAllUsersParams): Promise<NewsResultList>;
  
}