import axiosService from '../comom/axiosServices';
import { API_ENDPOINT } from '../constants/index';
let acc = JSON.parse(localStorage.getItem('account'));
const url = '/stories';
export const getStoriesAPI = () => {
    return axiosService.get(`${API_ENDPOINT}${url}/all`, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
};
export const addStoriesAPI = (data) => {
    return axiosService.post(`${API_ENDPOINT}${url}/add`, data, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
};
export const removeStoriesAPI = (id) => {
    return axiosService.delete(`${API_ENDPOINT}${url}/remove/${id}`, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
}