import { IPage } from "../../infrestructure/pageable-manager/IPage";
import { News } from "../model/News";
import { NewsCategory } from "../model/NewsCategory";
import { Permission } from "../model/Permission";


export interface INewsEngineRepository {
    findNewsById(id: string): Promise<News>;
    findNewsByTitle(title: string): Promise<News>;
    findAllNews(page: number, size: number, category?:NewsCategory,orderColumn?: string, direction?: 'ASC' | 'DESC'): Promise<IPage<News>>;
    saveNews(news: News): Promise<News>;
    updateNews(id: string, news: News): Promise<News>;
    deleteNews(id: string): Promise<void>;
    uploadImageNews(id: string, image: string): Promise<News>;
    deleteImageNews(id: string): Promise<News>;
}