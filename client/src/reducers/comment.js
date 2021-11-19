import * as TYPE from '../constants/comment';
import { toastError } from '../comom/tostHelper';
const init = {
    listComments: [],
};
const reducer = (state = init, action) => {
    let data = null;
    switch (action.type) {
        case TYPE.GET_COMMENT:
            return {
                ...state,
            };
        case TYPE.GET_COMMENT_SUCCESS:
            data = action.payload.data;
            return {
                ...state,
                listComments: data,
            };
        case TYPE.ADD_COMMENT:
            return {
                ...state,
            }
        case TYPE.ADD_COMMENT_SUCCESS:
            data = action.payload.data;
            const newListComments = [
                data,
                ...state.listComments,
            ];
            return {
                ...state,
                listComments: newListComments
            };
        case TYPE.DELETE_COMMENT:
            return {
                ...state,
            }
        case TYPE.DELETE_COMMENT_SUCCESS:
            data = action.payload.data;
            const index = state.listComments.findIndex(e => parseInt(e.idCM, 10) === parseInt(data.id, 10));
            if (index !== -1) {
                const newListComments = [
                    ...state.listComments.slice(0, index),
                    ...state.listComments.slice(index + 1)
                ];
                return {
                    ...state,
                    listComments: newListComments
                }
            }
            return {
                ...state,
            }
        case TYPE.COMMENT_ERROR:
            const { error } = action.payload;
            toastError(error);
            return {
                ...state,
            };
        default:
            return state;
    }
};
export default reducer;
