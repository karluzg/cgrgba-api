
import { NotFoundException } from "../../../infrestructure/exceptions/NotFoundExcecption";
import { Field } from "../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../infrestructure/response/enum/MiddlewareCustomErrorMessage";
import { News } from "../../model/News";
import { NewsCategory } from "../../model/NewsCategory";
import { Permission } from "../../model/Permission";
import { Role } from "../../model/Role";
import { User } from "../../model/User";
import { INewsEngineRepository } from "../INewsEngineRepository";
//import { myDataSource } from "../web-api/meta-inf/data-source";
import { IPermissionEngineRepository } from "../IPermissionEngineRepository";
import { injectable } from 'tsyringe'

const myDataSource = require('../../../domain/meta-inf/data-source');
const newsRepository = myDataSource.getRepository(News)

@injectable()
export class NewsEngineRepositoryImpl implements INewsEngineRepository {
  async findNewsByTitle(title: string): Promise<News> {
    const news = await newsRepository.createQueryBuilder('news')
      .where('news.title = :title', { title })
      .getOne();


    return news;
  }
  async findNewsById(id: string): Promise<News> {
    const news = await newsRepository.createQueryBuilder('news')
      .where('news.id = :id', { id })
      .getOne();


    return news;
  }

  async findAllNews(page: number, size: number, category?: NewsCategory): Promise<News[]> {
    const skipCount = (page - 1) * size;

    let queryBuilder = newsRepository.createQueryBuilder('news')
      .skip(skipCount)
      .take(size);
    try {


      if (category) {
        const code = category.code
        queryBuilder = queryBuilder.leftJoinAndSelect("news.newsCategory", "category")
          .where('category.code = :code', { code });
      }
    } catch (error) {
      console.log(error)
    }
    return await queryBuilder.getMany();
  }

  async saveNews(news: News): Promise<News> {
    return await newsRepository.save(news);
  }

  async updateNews(id: string, updateNewsData: News): Promise<News> {
    const permission = await newsRepository.createQueryBuilder('news')
      .where('news.id = :id', { id: id })
      .getOne();

    if (!permission) {
      throw new NotFoundException(Field.SYSTEM, MiddlewareBusinessMessage.PERMISSION_NOT_FOUND);
    }

    const updateNews = Object.assign(permission, updateNewsData);
    const savedNews = await newsRepository.save(updateNews);
    return savedNews;
  }

  async deleteNews(id: string): Promise<void> {
    const news = await newsRepository.createQueryBuilder('news')
      .where('news.id = :id', { id })
      .getOne();

    if (!news) {
      throw new NotFoundException(Field.SYSTEM, MiddlewareBusinessMessage.PERMISSION_NOT_FOUND);
    }

    await newsRepository.remove(news);
  }

  async uploadImageNews(id: string, image: string): Promise<News> {
    const news = await newsRepository.createQueryBuilder('news')
      .where('news.id = :id', { id })
      .getOne();

    if (news) {
      news.imagePath = image;
      return newsRepository.save(news);;
    }

    throw new NotFoundException(Field.SYSTEM, MiddlewareBusinessMessage.USER_NOT_FOUND);
  }


  async deleteImageNews(id: string): Promise<News> {
    const news = await newsRepository.createQueryBuilder('news')
      .where('news.id = :id', { id })
      .getOne();

    if (news) {
      news.imagePath = null;
      return newsRepository.save(news);
    }

    throw new NotFoundException(Field.SYSTEM, MiddlewareBusinessMessage.USER_NOT_FOUND);
  }




}


