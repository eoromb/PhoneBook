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
            resultQuery = query + `LIMIT ($${resultValues.length + 1}) `;
            resultValues = [...values];
            resultValues.push(nlimit);
            if (page) {
                let npage = +page;
                npage = npage < 1 ? 1 : npage;
                const offset = (npage - 1) * nlimit;
                resultQuery += ` OFFSET ($${resultValues.length + 1})`;
                resultValues.push(offset);
            }
        }
        return {query: resultQuery, values: resultValues};
    }
}
module.exports = QueryHelper;
