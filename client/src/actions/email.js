import * as TYPES from '../constants/email';
export const sendEmail = (array, content) => {
    return {
        type: TYPES.SEND_EMAIL,
        payload: { array, content }
    };
};
export const sendEmailSuccess = (data) => {
    return {
        type: TYPES.SEND_EMAIL_SUCCESS,
        payload: { data },
    };
};
export const sendEmailError = (error) => {
    return {
        type: TYPES.SEND_EMAIL_SUCCESS,
        payload: { error },
    };
};

