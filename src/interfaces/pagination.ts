/**
 * Represents the pagination information for an API response.
 */
export interface PaginationInfo {
    /**
     * The total number of items available.
     */
    count: number;

    /**
     * The total number of pages available.
     */
    pages: number;

    /**
     * The URL for the next page of results, or null if there is no next page.
     */
    next: string | null;

    /**
     * The URL for the previous page of results, or null if there is no previous page.
     */
    prev: string | null;
}
