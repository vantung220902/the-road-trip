import * as TYPE from '../constants/message';
import { toastError } from '../comom/tostHelper';
const init = {
    listMessage: [],
};
const reducer = (state = init, action) => {
    let data = null;
    switch (action.type) {
        case TYPE.GET_MESSAGE:
            return {
                ...state,
            };
        case TYPE.GET_MESSAGE_SUCCESS:
            data = action.payload.data;
            const arr = data.sort((a, b) => {
                return a.id - b.id;
            })
            return {
                ...state,
                listMessage: arr,
            };
        case TYPE.ADD_MESSAGE:
            return {
                ...state,
            }
        case TYPE.ADD_MESSAGE_SUCCESS:
            data = action.payload.data;
            const newListMessage = [
                ...state.listMessage,
                data,
            ];
            return {
                ...state,
                listMessage: newListMessage
            };
        case TYPE.DELETE_MESSAGE:
            const { id } = action.payload;
            const index = state.listMessage.findIndex((e) => { return e.id === id; });
            const array = [
                ...state.listMessage.slice(0, index),
                ...state.listMessage.slice(index + 1),
            ];
            if (index !== -1) {
                return {
                    ...state,
                    listMessage: array
                }

            }
            return {
                ...state,
            }
        case TYPE.DELETE_MESSAGE_SUCCESS:

            return {
                ...state,
            }
        case TYPE.MESSAGE_ERROR:
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
