import axiosService from '../comom/axiosServices';
import { API_ENDPOINT } from '../constants/index';
let acc = JSON.parse(localStorage.getItem('account'));
const url = '/comment';
export const getCommentAPI = (id) => {
    let queryParams = '';
    if (id) {
        queryParams = `/${id}`;
    }
    return axiosService.get(`${API_ENDPOINT}${url}/post${queryParams}`, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
};
export const createCommentAPI = (data) => {
    return axiosService.post(`${API_ENDPOINT}${url}/create`, data, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
};
export const deleteCommentAPI = (id) => {
    return axiosService.delete(`${API_ENDPOINT}${url}/delete/${id}`, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
};

