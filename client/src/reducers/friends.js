import * as TYPE from '../constants/friends';
import { toastError } from '../comom/tostHelper';
import { socket } from '../comom/socket';
const init = {
    isFriend: -1,
    listRequests: [],
    listFriends: []
};
const account = JSON.parse(localStorage.getItem('account'));
const myArray = (listRequests, id) => {
    let index = -1;
    index = listRequests.findIndex((t) => {
        return t.id === parseInt(id, 10)
    });
    if (index !== -1) {
        listRequests = [
            ...listRequests.slice(0, index),
            ...listRequests.slice(index + 1)
        ]
    }

    return listRequests;
}
const reducer = (state = init, action) => {
    let data, id, newListRequests = null;
    switch (action.type) {
        case TYPE.CHECK_FRIEND:
            return {
                ...state,
            }
        case TYPE.CHECK_FRIEND_SUCCESS:
            data = action.payload.data;
            return {
                ...state,
                isFriend: parseInt(data[0].state, 10)
            }
        case TYPE.ACCEPT_FRIEND:
            id = action.payload.id;
            newListRequests = myArray(state.listRequests, id);
            return {
                ...state,
                listRequests: newListRequests
            }
        case TYPE.REMOVE_FRIEND:
            return {
                ...state,
                isFriend: -1,
            }
        case TYPE.DECLINE_FRIEND:
            id = action.payload.id;
            newListRequests = myArray(state.listRequests, id);
            return {
                ...state,
                listRequests: newListRequests
            }
        case TYPE.FRIEND_ERROR:
            const { error } = action.payload;
            toastError(error);
            return {
                ...state,
            }
        case TYPE.ADD_FRIEND:
            return {
                ...state,
            }
        case TYPE.ADD_FRIEND_SUCCESS:
            data = action.payload.data;
            socket.emit('send_request', {
                ...data,
                fullName: account.fullName,
                avt: account.avt,
            });
            return {
                ...state,
                isFriend: 0,
                listRequests: [
                    data,
                    ...state.listRequests,
                ]
            }

        case TYPE.LIST_REQUEST_FRIEND:
            return {
                ...state,
            }
        case TYPE.LIST_REQUEST_FRIEND_SUCCESS:
            data = action.payload.data;
            return {
                ...state,
                listRequests: data,
            }
        case TYPE.LIST_FRIEND:
            return {
                ...state,
            }
        case TYPE.LIST_FRIEND_SUCCESS:
            data = action.payload.data;
            return {
                ...state,
                listFriends: data,
            }
        default:
            return state;
    }
};
export default reducer;
