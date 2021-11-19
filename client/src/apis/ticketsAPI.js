import axiosService from '../comom/axiosServices';
import { API_ENDPOINT } from '../constants/index';
import qs from 'query-string';
const url = '/tickets';
let acc = JSON.parse(localStorage.getItem('account'));
export const getListTickets = (param = {}) => {
    let queryParams = '';
    if (Object.keys(param).length > 0) {
        queryParams = `?_start=${param.start}&_limit=${param.limit}`;
    }
    return axiosService.get(`${API_ENDPOINT}${url}${queryParams}`);
};
export const getFilterTickets = (param = {}) => {
    let queryParams = '';
    if (Object.keys(param).length > 0) {
        queryParams = `?${qs.stringify(param)}`;
    }
    return axiosService.get(`${API_ENDPOINT}${url}/search${queryParams}`);
};
export const getFilterByAuthorAPI = (idAuthor, param = {}) => {
    let queryParams = '';
    if (Object.keys(param).length > 0) {
        queryParams = `?${qs.stringify(param)}`;
    }
    return axiosService.get(`${API_ENDPOINT}${url}/searchByAuthor/${idAuthor}${queryParams}`);
};
export const getTicket = (id) => {
    let queryParams = '';
    if (id) {
        queryParams = `/detail/${id}`;
    }
    return axiosService.get(`${API_ENDPOINT}${url}${queryParams}`);
};
export const getAllIdsAPI = () => {

    return axiosService.get(`${API_ENDPOINT}${url}/ids`);
};

export const creteTicketAPI = (data) => {

    return axiosService.post(`${API_ENDPOINT}${url}/create`, data, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
};
export const getTicketSellAPI = (id, param = {}) => {
    let queryParams = `/${id}`;
    if (Object.keys(param).length > 0) {
        queryParams = `/${id}?_start=${param.start}&_limit=${param.limit}`;
    }
    return axiosService.get(`${API_ENDPOINT}${url}/sell${queryParams}`, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
};
export const updateTicketAPI = (id, data) => {
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
export const deletedTicketAPI = (data) => {
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
export const acceptTicketAPI = (data) => {

    return axiosService.patch(`${API_ENDPOINT}${url}/accept`, data, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
}
export const deletedForeverTicketAPI = (data) => {
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
export const getTrashAdminAPI = () => {

    return axiosService.get(`${API_ENDPOINT}${url}/trashAdmin`, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
};
export const restoreTicketAPI = (data) => {
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
export const getCountSellAPI = (key) => {
    let queryParams = '';
    if (key) {
        queryParams = `/count/${parseInt(key, 10)}`;
    }
    return axiosService.get(`${API_ENDPOINT}${url}${queryParams}`);
};
export const getNumbersAPI = () => {

    return axiosService.get(`${API_ENDPOINT}${url}/number`);
};
export const getTicketsApprovalAPI = () => {
    return axiosService.get(`${API_ENDPOINT}${url}/approval`, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
};

export const getTicketsAdminAPI = () => {
    return axiosService.get(`${API_ENDPOINT}${url}/ticketsAdmin`, {
        headers: {
            Authorization: acc ? acc.Authorization : ''
        }
    });
};
