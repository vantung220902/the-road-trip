import axiosService from '../comom/axiosServices';
import { API_ENDPOINT } from '../constants';
let acc = JSON.parse(localStorage.getItem('account'));
const url = '/message';
export const getMessageAPI = (id) => {
    let queryParams = '';
    if (id) {
        queryParams = `?id=${id}&id2=${acc.id}`;
    }
    return axiosService.get(`${API_ENDPOINT}${url}/list${queryParams}`, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
};
export const createMessageAPI = (data) => {
    return axiosService.post(`${API_ENDPOINT}${url}/create`, data, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
};
export const deleteMessageAPI = (id) => {
    return axiosService.delete(`${API_ENDPOINT}${url}/delete/${id}`, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
};

