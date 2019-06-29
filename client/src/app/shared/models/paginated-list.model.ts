import { Pagination } from './pagination.model';

/**
 * List of item with pagination
 */
export interface PaginatedList<T> {
    pagination: Pagination;
    items: T[];
}
/**
 * Creates paginated list object
 * @param items items
 * @param pagination pagination
 */
export function createPaginatedList<T>(items: T[], pagination?: Pagination): PaginatedList<T> {
    return {
        items,
        pagination
    };
}
