/**
 * Helpers class
 *
 * @param file
 * @param files
 */

class Helpers {
    /**
     * fetchHelper
     *
     * @param {object} reqParams parameters for request
     * @return {Promise} for parameters
     */
    fetchHelper = (reqParams) => {
        const {
            url, method, headers = {}, data, file,
        } = reqParams;
        const fetchPromise = (resolve, reject) => {
            fetch(url, {
                method,
                headers: {
                    ...headers,
                },
                body: file || (data && JSON.stringify(data)),
            })
                .then((response) => response)
                .then((response) => [response.json(), response.status])
                .then(([response, status]) => {
                    if (status >= 200 && status <= 300) {
                        resolve(response);
                    } else {
                        return [response, status];
                    }
                })
                .then(([error, status]) => {
                    error
                        .then((err) => {
                            let errorMessage = '';
                            switch (status) {
                                case 400:
                                    errorMessage = err.message || 'Bad Request';
                                    break;
                                case 401:
                                    errorMessage = err.message || 'Unauthorized Access';
                                    break;
                                case 500:
                                    errorMessage = err.message || 'Internal server error';
                                    break;
                                default:
                                    errorMessage = 'Error';
                            }
                            throw errorMessage;
                        })
                        .catch((error) => {
                            reject(error)
                        });
                })
                .catch((error) => {
                    reject(error);
                });
        };
        return new Promise(fetchPromise);
    };

    /**
     * get method
     *
     * @param {object} payload for request
     * @return {object} response
     */
    get = ({ url, headers }) => {
        const reqParams = {
            url,
            method: 'GET',
            headers,
        };
        return this.fetchHelper(reqParams);
    };

    /**
     * post method
     *
     * @param {object} payload for request
     * @return {object} response
     */
    post = ({ url, data }) => {
        const headers = {
            'Content-Type': 'application/json',
        };
        const reqParams = {
            url,
            method: 'POST',
            headers,
            data,
        };
        return this.fetchHelper(reqParams);
    };

    filePost = ({ url, file }) => {
        const headers = {};
        const reqParams = {
            url,
            method: 'POST',
            headers,
            file,
        };
        return this.fetchHelper(reqParams);
    };

    /**
     * put method
     *
     * @param {object} payload for request
     * @return {object} response
     */
    put = ({ url, data }) => {
        const headers = {
            'Content-Type': 'application/json',
        };
        const reqParams = {
            url,
            method: 'PUT',
            headers,
            data,
        };
        return this.fetchHelper(reqParams);
    };

    delete = ({ url }) => {
        const headers = {
            'Content-Type': 'application/json',
        };
        const reqParams = {
            url,
            method: 'DELETE',
            headers,
        };
        return this.fetchHelper(reqParams);
    };
}

export default new Helpers();
