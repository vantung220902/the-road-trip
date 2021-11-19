import axiosService from '../comom/axiosServices';
import { API_ENDPOINT } from '../constants/index';
import qs from 'query-string';
const url = '/cardEvent';
let acc = JSON.parse(localStorage.getItem('account'));
export const paymentsAPI = (data) => {

    return axiosService.post(`${API_ENDPOINT}${url}/buyTicket`, data, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
};
export const getTicketBuyAPI = () => {

    return axiosService.get(`${API_ENDPOINT}${url}`);
};
export const getIdAccBuyAPI = (key, params = {}) => {
    let queryParams = `?idAccount=${parseInt(key, 10)}`;
    if (Object.keys(params).length > 0) {
        queryParams += `&_start=${params.start}&_limit=${params.limit}`;
    }
    return axiosService.get(`${API_ENDPOINT}${url}${queryParams}`, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
};
export const searchesAPI = (idAuthor, param = {}) => {
    let queryParams = '';
    if (Object.keys(param).length > 0) {
        queryParams = `?${qs.stringify(param)}`;
    }
    return axiosService.get(`${API_ENDPOINT}${url}/search/${idAuthor}${queryParams}`);
};
export const deletedPaymentAPI = (data) => {
    let queryParams = '';
    if (data) {
        queryParams = `/deleted`;
    }
    return axiosService.patch(`${API_ENDPOINT}${url}${queryParams}`, data, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
}
export const updatePaymentAPI = (data) => {
    let queryParams = '';
    if (data) {
        queryParams = `/update`;
    }
    return axiosService.patch(`${API_ENDPOINT}${url}${queryParams}`, data, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
}
export const deletedForeverPaymentAPI = (data) => {
    let queryParams = '';
    if (data) {
        queryParams = `/deletedForever`;
    }
    return axiosService.post(`${API_ENDPOINT}${url}${queryParams}`, data, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
}

export const getTrashIdAccBuyAPI = (key) => {
    let queryParams = '';
    if (key) {
        queryParams = `/trash/${parseInt(key, 10)}`;
    }
    return axiosService.get(`${API_ENDPOINT}${url}${queryParams}`, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
};
export const getTrashAPI = () => {

    return axiosService.get(`${API_ENDPOINT}${url}/adminTrash`, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
};
export const getPaymentIdAPI = (key) => {
    let queryParams = '';
    if (key) {
        queryParams = `/find/${parseInt(key, 10)}`;
    }
    return axiosService.get(`${API_ENDPOINT}${url}${queryParams}`, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
};

export const restorePaymentAPI = (data) => {
    let queryParams = '';
    if (data) {
        queryParams = `/restore`;
    }
    return axiosService.patch(`${API_ENDPOINT}${url}${queryParams}`, data, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
}
export const getCountBuyAPI = (key) => {
    let queryParams = '';
    if (key) {
        queryParams = `/count/${parseInt(key, 10)}`;
    }
    return axiosService.get(`${API_ENDPOINT}${url}${queryParams}`);
};

export const revenueAPI = () => {
    return axiosService.get(`${API_ENDPOINT}${url}/revenue`, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
};
export const lastsPaymentAPI = () => {
    return axiosService.get(`${API_ENDPOINT}${url}/lasts`, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
}
export const transactionPaymentAPI = () => {
    return axiosService.get(`${API_ENDPOINT}${url}/transactions`, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
}
