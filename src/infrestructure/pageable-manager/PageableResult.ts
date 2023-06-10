
import { ResultTemplate } from "../template/ResultTemplate";

export class PageableResult<T> extends ResultTemplate {
  private content: T[];
  private totalElements: number;
  private pageSize: number;
  private totalPages: number;
  private currentPage: number;

  constructor() {
    super();
    this.getSuccessfullyMessage();
  }


  parameterizedType(): any {
    return (this.constructor as any).prototype.constructor.arguments[0];
  }

  getTotalElements(): number {
    return this.totalElements;
  }

  setTotalElements(totalElements: number): PageableResult<T> {
    this.totalElements = totalElements;
    return this;
  }

  getSize(): number {
    return this.pageSize;
  }

  setPageSize(size: number): PageableResult<T> {
    this.pageSize = size;
    return this;
  }

  getTotalPages(): number {
    return this.totalPages;
  }

  setTotalPages(totalPages: number): PageableResult<T> {
    this.totalPages = totalPages;
    return this;
  }

  getCurrentPage(): number {
    return this.currentPage;
  }

  setCurrentPage(currentPage: number): PageableResult<T> {
    this.currentPage = currentPage;
    return this;
  }

  getContent(): T[] {
    return this.content;
  }

  setContent(content: T[]): PageableResult<T> {
    this.content = content;
    return this;
  }
}
