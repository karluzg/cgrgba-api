import { PageableResult } from "./PageableResult";
import { IPage } from './IPage';

export class PageableUtils {

  public static async ofWithoutContent<T>(result: PageableResult<T>, page: IPage<T>): Promise<PageableResult<T>> {
    return result
      .setContent(page.content)
      .setCurrentPage(page.pageNumber + 1)
      .setPageSize(page.pageSize)
      .setTotalElements(page.numberOfElements)
      .setTotalPages(page.totalPages);
  }
  static ofWithContent<T>(result: PageableResult<T>, page: IPage<T>, content: T[]): PageableResult<T> {
    return result
      .setContent(content)
      .setCurrentPage(page.pageNumber + 1)
      .setPageSize(page.pageSize)
      .setTotalElements(page.numberOfElements)
      .setTotalPages(page.totalPages);
  }
}
