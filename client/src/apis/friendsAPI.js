import axiosService from '../comom/axiosServices';
import { API_ENDPOINT } from '../constants/index';
let acc = JSON.parse(localStorage.getItem('account'));
const url = '/friends';
export const checkFriendsAPI = (id) => {
    let queryParams = '';
    if (id) {
        queryParams = `?id1=${id}&id2=${acc.id}`;
    }
    return axiosService.get(`${API_ENDPOINT}${url}/check${queryParams}`, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
};
export const requestFriendsAPI = (id) => {
    const data = { id2: id, id1: acc.id };
    return axiosService.post(`${API_ENDPOINT}${url}/request`, data, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
};

export const getRequestFriendsAPI = (id) => {
    return axiosService.get(`${API_ENDPOINT}${url}/listRequest/${id}`, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
};

export const getFriendsAPI = (id) => {
    return axiosService.get(`${API_ENDPOINT}${url}/listFriends/${id}`, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
};

export const acceptRequestAPI = (id) => {
    return axiosService.patch(`${API_ENDPOINT}${url}/accept/`, { id }, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
};
export const declineRequestAPI = (id) => {
    return axiosService.delete(`${API_ENDPOINT}${url}/decline/${id}`, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
};
export const removeFriendAPI = (friend) => {
    return axiosService.delete(`${API_ENDPOINT}${url}/remove?id=${friend.id}&id2=${acc.id2}`, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
};