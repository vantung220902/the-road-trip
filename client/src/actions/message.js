import * as TYPES from '../constants/message';
export const watchMessage = (id) => {
    return {
        type: TYPES.GET_MESSAGE,
        payload: { id }
    };
};
export const watchMessageSuccess = (data) => {
    return {
        type: TYPES.GET_MESSAGE_SUCCESS,
        payload: { data },
    };
};
export const messageError = (error) => {
    return {
        type: TYPES.MESSAGE_ERROR,
        payload: { error },
    };
};
export const addMessage = (message) => {
    return {
        type: TYPES.ADD_MESSAGE,
        payload: { message }
    };
};
export const addMessageSuccess = (data) => {
    return {
        type: TYPES.ADD_MESSAGE_SUCCESS,
        payload: { data },
    };
};
export const deleteMessage = (id) => {
    return {
        type: TYPES.DELETE_MESSAGE,
        payload: { id }
    };
};

export const deleteMessageSuccess = (data) => {
    return {
        type: TYPES.DELETE_MESSAGE_SUCCESS,
        payload: { data },
    };
};
