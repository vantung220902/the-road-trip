import axiosService from '../comom/axiosServices';
import { API_ENDPOINT } from '../constants';
const acc = JSON.parse(localStorage.getItem('account'));
const url = '/invitations';
export const watchInvitationAPI = (id) => {
    let queryParams = '';
    if (id) {
        queryParams = `/receive/${id}`;
    }
    return axiosService.get(`${API_ENDPOINT}${url}${queryParams}`, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
}
export const deleteInvitationAPI = (id) => {
    return axiosService.delete(`${API_ENDPOINT}${url}/delete/${id}`, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
}
export const createInvitationAPI = (data) => {
    return axiosService.post(`${API_ENDPOINT}${url}/create/${acc.id}`, data, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
};
export const acceptInvitationAPI = (id) => {
    return axiosService.patch(`${API_ENDPOINT}${url}/accept/${id}`, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
}