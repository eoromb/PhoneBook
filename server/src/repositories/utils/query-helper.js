/**
 * Query helper
 */
class QueryHelper {
    /**
     * Adds pagination to query
     * @param {string} query query
     * @param {Array} values values
     * @param {number} [page] page
     * @param {number} [limit] limit
     */
    static addPagination (query, values, page, limit) {
        let resultQuery = query;
        let resultValues = values;
        if (limit) {
            const nlimit = +limit;
            resultQuery = query + `LIMIT ($${values.length + 1}) `;
            resultValues = [...values];
            resultValues.push(nlimit);
            if (page) {
                const npage = +page;
                const offset = (npage - 1) * nlimit;
                resultQuery += ` OFFSET ($${values.length + 1})`;
                resultValues.push(offset);
            }
        }
        return {query: resultQuery, values: resultValues};
    }
}
module.exports = QueryHelper;
