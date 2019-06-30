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
    static addPagination ({query, values, page, limit}) {
        let resultQuery = query;
        let resultValues = values;
        if (limit) {
            const nlimit = +limit;
            resultQuery = resultQuery + `LIMIT ($${resultValues.length + 1}) `;
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
    static addSort ({query, values, sort, order}) {
        let resultQuery = query;
        const resultValues = values;
        if (sort) {
            resultQuery += ` ORDER BY ${sort} `;
            if (order) {
                resultQuery += `${order} `;
            }
        }
        return {query: resultQuery, values: resultValues};
    }
    static addFilter ({query, values, filter}) {
        let resultQuery = query;
        let resultValues = values;
        if (typeof filter === 'string') {
            const likeStr = `%${filter.toLowerCase()}%`;
            resultQuery = resultQuery +
                ` WHERE LOWER(fname) LIKE ($${resultValues.length + 1}) OR LOWER(lname) LIKE ($${resultValues.length + 1}) `;
            resultValues = [...values];
            resultValues.push(likeStr);
        }
        return {query: resultQuery, values: resultValues};
    }
}
module.exports = QueryHelper;
