export interface PaginationResult<T> {
    totalCount: number;
    page: number;
    pageSize: number;
    data: T[];
}