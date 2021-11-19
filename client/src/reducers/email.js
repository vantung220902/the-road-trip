import * as TYPE from '../constants/email';
import { toast } from 'react-toastify';
const init = {
    check: false,
};
const reducer = (state = init, action) => {
    let data = null;
    switch (action.type) {
        case TYPE.SEND_EMAIL:
            return {
                ...state,
            };
        case TYPE.SEND_EMAIL_SUCCESS:
            data = action.payload.data;
            toast.success('Send Email Successfully 😀');
            return {
                ...state,
                check: data.check,
            };
        case TYPE.SEND_EMAIL_ERROR:
            const error = action.payload.error;
            console.log(error);
            return {
                ...state,
            }
        default:
            return state;
    }
};
export default reducer;
