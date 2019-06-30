const defaultPageSizeOptions = [20, 30, 50];
/**
 * Pagination model
 */
export interface Pagination {
    rowsCount: number;
    pageIndex: number;
    pageSize: number;
    pageSizeOptions: number[];
}
/**
 * Gets default pagination
 */
export function createPagination(pageIndex = 1, pageSize = 20, rowsCount = 100): Pagination {
    return {
        pageSizeOptions: defaultPageSizeOptions,
        rowsCount,
        pageIndex,
        pageSize,
    };
}
/**
 * Corrects pageIndex and pageSize based on total element number
 */
export function correctPaginationParams(pageIndex, pageSize, total): { pageIndex: number, pageSize: number } {
    if (pageIndex == null || Number.isNaN(pageIndex) || pageIndex < 1) {
        pageIndex = 1;
    }
    const resultPageSize = defaultPageSizeOptions.indexOf(pageSize) === -1 ? defaultPageSizeOptions[0] : pageSize;
    const maxPageIndex = Math.min(pageIndex, Math.ceil(total / resultPageSize));

    return { pageIndex: maxPageIndex, pageSize: resultPageSize };
}
