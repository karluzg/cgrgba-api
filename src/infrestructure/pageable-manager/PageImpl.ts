
import { IPage } from "./IPage";

export class PageImpl<T> implements IPage<T> {


    constructor(
        public content: T[],
        public pageNumber: number,
        public pageSize: number,
        public numberOfElements: number,
        public totalPages: number,

    ) { }

}