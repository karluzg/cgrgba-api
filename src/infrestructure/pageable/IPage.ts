export interface IPage<T> {

    content: T[];
    total: number;
    currentPage: number;
    totalPages: number;
}


