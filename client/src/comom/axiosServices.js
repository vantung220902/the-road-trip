import axios from 'axios';

class AxiosService {
    constructor() {
        const instance = axios.create({
            timeout: 5000,

        });
        instance.interceptors.response.use(
            this.handleSuccess,
            this.handleError,
        );
        this.instance = instance;
    }
    handleSuccess(response) {
        return response;
    }
    handleError(error) {
        return Promise.reject(error);
    }
    get(url, config = null) {
        return this.instance.get(url, config);
    }
    post(url, data, config = null) {
        return this.instance.post(url, data, config);
    }
    put(url, data, config = null) {
        return this.instance.put(url, data, config);
    }
    delete(url, config = null) {
        return this.instance.delete(url, config);
    }
    patch(url, data, config = null) {
        return this.instance.patch(url, data, config);
    }
}
export default new AxiosService();
