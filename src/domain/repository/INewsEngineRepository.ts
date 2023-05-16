import { News } from "../model/News";
import { Permission } from "../model/Permission";


export interface INewsEngineRepository {
    findNewsById(id: string): Promise<News>;
    findNewsByTitle(title: string): Promise<News>;
    findAllNews(page: number, size: number): Promise<News[]>;
    saveNews(news: News): Promise<News>;
    updateNews(id: string, news: News): Promise<News>;
    deleteNews(id: string): Promise<void>;
    uploadImageNews(id: string, image: any): Promise<News>;
    deleteImageNews(id: string): Promise<News>;
}