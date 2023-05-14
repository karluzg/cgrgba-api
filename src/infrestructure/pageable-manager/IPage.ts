
export interface IPage<T> {

    content: T[];
    pageNumber: number;
    pageSize: number;
    numberOfElements: number;
    totalPages: number;


}