const request = require('request-promise');
const expect = require('chai').expect;
module.exports = {
    resetDatabase: async () => {
        return request.post({url: 'http://localhost:3000/testutils/resetdatabase', body: {}, json: true});
    },
    getList: async (options, errorCode) => {
        const {baseUrl, checkFn, queryParams, getFullResponse = false} = options;
        try {
            const result = await request.get(baseUrl, {
                qs: queryParams,
                resolveWithFullResponse: true
            });
            expect(result).to.exist;
            const resultList = JSON.parse(result.body);
            const total = +result.headers['x-total-count'];

            for (let i = 0; i < resultList.length; i++) {
                if (checkFn) {
                    checkFn(resultList[i]);
                }
            }
            expect(errorCode).to.not.exist;
            return getFullResponse ? {results: resultList, total} : resultList;
        } catch (error) {
            expect(errorCode).to.exist;
            expect(error.statusCode).to.be.equal(errorCode);
        }
    },
    add: async (body, options, errorCode) => {
        const {baseUrl, checkFn} = options;
        try {
            const result = await request.post(baseUrl, {
                body: body,
                json: true
            });
            if (checkFn) {
                checkFn(result);
            }
            expect(errorCode).to.not.exist;
            return result;
        } catch (error) {
            expect(errorCode).to.exist;
            expect(error.statusCode).to.be.equal(errorCode);
        }
    },
    get: async (object, options, errorCode) => {
        const baseUrl = options.baseUrl;
        const checkFn = options.checkFn;
        const id = object.hasOwnProperty('id') ? object['id'] : object;
        try {
            const result = await request.get(`${baseUrl}/${id}`, {
                json: true
            });
            if (checkFn) {
                checkFn(result);
            }
            expect(errorCode).to.not.exist;
            return result;
        } catch (error) {
            expect(errorCode).to.exist;
            expect(error.statusCode).to.be.equal(errorCode);
        }
    },
    delete: async (object, options, errorCode) => {
        const baseUrl = options.baseUrl;
        const id = object.hasOwnProperty('id') ? object['id'] : object;
        try {
            const result = await request.delete(`${baseUrl}/${id}`, {
            });
            expect(result).to.exist;
            expect(errorCode).to.not.exist;
            return {};
        } catch (error) {
            expect(errorCode).to.exist;
            expect(error.statusCode).to.be.equal(errorCode);
        }
    },
    update: async (object, body, options, errorCode) => {
        const baseUrl = options.baseUrl;
        const checkFn = options.checkFn;
        const id = object.hasOwnProperty('id') ? object['id'] : object;
        try {
            const result = await request.put(`${baseUrl}/${id}`, {
                body: body,
                json: true
            });
            if (checkFn) {
                checkFn(result);
            }

            expect(errorCode).to.not.exist;
            return result;
        } catch (error) {
            expect(errorCode).to.exist;
            expect(error.statusCode).to.be.equal(errorCode);
        }
    }
};
