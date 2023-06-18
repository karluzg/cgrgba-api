
import { Field } from "../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../infrestructure/response/enum/MiddlewareCustomMessage";
import { NewsCategory } from "../../model/NewsCategory";
import { injectable } from 'tsyringe'
import { INewsCategoryEngineRepository } from "../INewsCategoryEngineRepository";
import { InvalidParametersException } from "../../../infrestructure/exceptions/InvalidParametersException";

const myDataSource = require('../../../domain/meta-inf/data-source');
const newsCategoryRepository = myDataSource.getRepository(NewsCategory);

@injectable()
export class NewsCategoryEngineRepositoryImpl implements INewsCategoryEngineRepository {
 
    async findNewsCategoryById(id: string): Promise<NewsCategory> {
   
    return await newsCategoryRepository.createQueryBuilder('newscategory')
    .where('newscategory.id = :id', { id })
    .getOne();
  }

  async findNewsCategoryByCode(code: string): Promise<NewsCategory> {
 
    return await newsCategoryRepository.createQueryBuilder('newscategory')
    .where('newscategory.code = :code', { code })
    .getOne();
  }

  async findAllNewsCategory(page: number, size: number): Promise<NewsCategory[]> {
    const skipCount = (page - 1) * size;

    return await newsCategoryRepository.createQueryBuilder('newscategory')
    .skip(skipCount)
    .take(size)
    .getMany();
  }

  async saveNewsCategory(newsCategory: NewsCategory): Promise<NewsCategory> {
    return await newsCategoryRepository.save(newsCategory);
  }

  async updateNewsCategory(id: string, updateNewsCategoryData: NewsCategory): Promise<NewsCategory> {
    const newsCategory = await newsCategoryRepository.createQueryBuilder('newscategory')
      .where('newscategory.id = :id', { id })
      .getOne();

    if (!newsCategory) {
      throw new InvalidParametersException(Field.SYSTEM, MiddlewareBusinessMessage.PERMISSION_NOT_EXIST);
    }

    const updatedNewsCategory = Object.assign(newsCategory, updateNewsCategoryData);
    const savedNewsCategory = await newsCategoryRepository.save(updatedNewsCategory);
    return savedNewsCategory;
  }

  async deleteNewsCategory(id: string): Promise<void> {
    const newsCategory = await newsCategoryRepository.createQueryBuilder('newscategory')
      .where('newscategory.id = :id', { id })
      .getOne();

    if (!newsCategory) {
      throw new InvalidParametersException(Field.SYSTEM, MiddlewareBusinessMessage.PERMISSION_NOT_EXIST);
    }

    await newsCategoryRepository.remove(newsCategory);
  }
}
