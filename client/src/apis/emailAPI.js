import axiosService from '../comom/axiosServices';
import { API_ENDPOINT } from '../constants';
const acc = JSON.parse(localStorage.getItem('account'));
const url = '/email';
export const sendEmailAPI = (data) => {
    return axiosService.post(`${API_ENDPOINT}${url}/sendEmail`, data, {
        headers: {
            Authorization: acc ? acc.Authorization : '',

        }
    });
}