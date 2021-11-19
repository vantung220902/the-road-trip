import axiosService from '../comom/axiosServices';
import { API_ENDPOINT } from '../constants/index';
const url = '/user';
let acc = JSON.parse(localStorage.getItem('account'));
export const signInAPI = (data) => {
    let params = '';
    if (data) {
        params = `/signIn`;
    }
    return axiosService.post(`${API_ENDPOINT}${url}${params}`, data);
};


export const signUpAPI = (data) => {
    let params = '';
    if (data) {
        params = `/signUp`;
    }
    return axiosService.post(`${API_ENDPOINT}${url}${params}`, data);
};

export const findEmailAPI = (email) => {
    let params = '';
    if (email) {
        params = `/findEmail?email=${email}`;
    }
    return axiosService.get(`${API_ENDPOINT}${url}${params}`);
}
export const findUserAPI = (id) => {
    let params = '';
    if (id) {
        params = `/findUser/${id}`;
    }
    return axiosService.get(`${API_ENDPOINT}${url}${params}`);
}

export const updateUserAPI = (user) => {
    return axiosService.put(`${API_ENDPOINT}${url}/update`, user, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
}
export const countUserAPI = () => {
    return axiosService.get(`${API_ENDPOINT}${url}/count`, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
}
export const lastsUserAPI = (start, end) => {
    return axiosService.get(`${API_ENDPOINT}${url}/lasts?start=${start}&end=${end}`, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
}
export const transactionsUserAPI = () => {
    return axiosService.get(`${API_ENDPOINT}${url}/transactions`, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
}
export const deletedUserAPI = (data) => {
    return axiosService.patch(`${API_ENDPOINT}${url}/deleted`, data, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
}
export const deletedForeverUserAPI = (data) => {

    return axiosService.post(`${API_ENDPOINT}${url}/deletedForever`, data, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
}

export const getTrashUserAPI = () => {

    return axiosService.get(`${API_ENDPOINT}${url}/trash`, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
};
export const restoreUserAPI = (data) => {
    return axiosService.patch(`${API_ENDPOINT}${url}/restore`, data, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
}
export const getAllIdsAPI = () => {

    return axiosService.get(`${API_ENDPOINT}${url}/ids`);
};