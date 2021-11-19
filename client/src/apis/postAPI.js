import axiosService from '../comom/axiosServices';
import { API_ENDPOINT } from '../constants/index';
let acc = JSON.parse(localStorage.getItem('account'));
const url = '/post';
export const getPostAPI = (param = {}) => {
    let queryParams = '';
    if (Object.keys(param).length > 0) {
        queryParams = `?start=${parseInt(param.start, 10)}&limit=${parseInt(param.limit, 10)}`;
    }
    return axiosService.get(`${API_ENDPOINT}${url}/all${queryParams}`, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
};
export const addPostAPI = (data) => {
    return axiosService.post(`${API_ENDPOINT}${url}/add`, data, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
};
export const likeAPI = (data) => {
    return axiosService.patch(`${API_ENDPOINT}${url}/like`, data, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
};
export const myPostAPI = (id) => {
    return axiosService.get(`${API_ENDPOINT}${url}/myPost/${id}`, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
};

export const findPostAPI = (id) => {
    return axiosService.get(`${API_ENDPOINT}${url}/findPost/${id}`, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
};

export const deletePostAPI = (data) => {
    let queryParams = '';
    if (data) {
        queryParams = `/delete`;
    }
    return axiosService.post(`${API_ENDPOINT}${url}${queryParams}`, data, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
}
export const updatePostAPI = (id, data) => {
    let queryParams = '';
    if (id) {
        queryParams = `/update/${id}`;
    }
    return axiosService.put(`${API_ENDPOINT}${url}${queryParams}`, data, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
};
export const countPostAPI = (month) => {
    return axiosService.get(`${API_ENDPOINT}${url}/count/${month}`, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
}
export const numberPostAPI = () => {
    return axiosService.get(`${API_ENDPOINT}${url}/number`, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
}