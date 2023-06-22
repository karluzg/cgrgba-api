import { IPage } from "../../infrestructure/pageable-manager/IPage";
import { NewsCategory } from "../model/NewsCategory";
import { Permission } from "../model/Permission";


export interface INewsCategoryEngineRepository {
    findNewsCategoryById(id: string): Promise<NewsCategory>;
    findNewsCategoryByCode(Code: string): Promise<NewsCategory>;
    findAllNewsCategory(page: number, size: number, orderColumn?: string, direction?: 'ASC' | 'DESC'): Promise<IPage<NewsCategory>> 
    saveNewsCategory(news: NewsCategory): Promise<NewsCategory>;
    updateNewsCategory(id: string, news: NewsCategory): Promise<NewsCategory>;
    deleteNewsCategory(id: string): Promise<void>;
}