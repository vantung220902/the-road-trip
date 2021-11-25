import * as TYPES from '../constants/signInUp';
import { toast } from 'react-toastify';
import { toastError } from '../comom/tostHelper';
const init = {
    account: null,
    person: null,
    listUsers: [],
    lastsUsers: [],
    transactions: []
};
const myArray = (listPayments, arrayIds) => {
    let index = -1;
    arrayIds.forEach(id => {
        index = listPayments.findIndex((t) => { return t.id === parseInt(id, 10) });
        if (index !== -1) {
            listPayments = [
                ...listPayments.slice(0, index),
                ...listPayments.slice(index + 1)
            ]
        }
    });
    toast.success('Restore Successfully 😀');
    return listPayments;
}
const reducer = (state = init, action) => {
    let data, error, account, lastsUsers, arrayIds, newListUser = null;
    switch (action.type) {
        case TYPES.SIGN_IN:
            return {
                ...state,
            };
        case TYPES.SIGN_IN_SUCCESS:
            data = action.payload.data;
            account = data ? data : null;
            if (account === null) {
                toast.error("User password don't correct", {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            localStorage.setItem('account', JSON.stringify(account));
            return {
                ...state,
                account: account,
            };
        case TYPES.SIGN_UP:
            return {
                ...state,
            };
        case TYPES.SIGN_UP_SUCCESS:
            data = action.payload.data;
            account = data ? data : null;
            localStorage.setItem('account', JSON.stringify(account));
            return {
                ...state,
                account: data,
            };
        case TYPES.ADD_USER:
            return {
                ...state,
            };
        case TYPES.ADD_USER_SUCCESS:
            data = action.payload.data;
            toast.success('Add Successfully 😀');
            return {
                ...state,
            };
        case TYPES.UPDATE_USER:
            return {
                ...state,
            };
        case TYPES.UPDATE_USER_SUCCESS:
            data = action.payload.data;
            const acc = JSON.parse(localStorage.getItem('account'));
            const Authorization = acc.Authorization;
            localStorage.removeItem('account');
            localStorage.setItem('account', JSON.stringify({ ...data, Authorization }));
            toast.success('Update Successfully 😀');
            return {
                ...state,
                account: data,
            };
        case TYPES.UPDATE_USER_ADMIN:
            return {
                ...state,
            };
        case TYPES.UPDATE_USER_ADMIN_SUCCESS:
            data = action.payload.data;
            toast.success('Update Successfully 😀');
            return {
                ...state,
                person: data,
            };
        case TYPES.FIND_USER:
            return {
                ...state,
            };
        case TYPES.FIND_USER_SUCCESS:
            data = action.payload.data;
            return {
                ...state,
                person: data[0],
            };
        case TYPES.COUNT_USER:
            return {
                ...state,
            };
        case TYPES.COUNT_USER_SUCCESS:
            data = action.payload.data;
            return {
                ...state,
                listUsers: data
            };
        case TYPES.LASTS_USER:
            return {
                ...state,
            };
        case TYPES.LASTS_USER_SUCCESS:
            data = action.payload.data;
            return {
                ...state,
                lastsUsers: data
            };
        case TYPES.TRANSACTIONS_USER:
            return {
                ...state,
            };
        case TYPES.TRANSACTIONS_USER_SUCCESS:
            data = action.payload.data;
            return {
                ...state,
                transactions: data
            };
        case TYPES.SIGN_ERROR:
            error = action.payload.error;
            toastError(error);
            return {
                ...state,
            };
        case TYPES.SIGN_OUT:
            return {
                ...init
            };
        case TYPES.DELETED_USER:
            return {
                ...state,
            }
        case TYPES.DELETED_USER_SUCCESS:
            lastsUsers = state.lastsUsers;
            arrayIds = action.payload.arrayIds;
            newListUser = myArray(lastsUsers, arrayIds);
            toast.success('Create Successfully 😀');
            return {
                ...state,
                lastsUsers: newListUser,
            }
        case TYPES.TRASH_USER:
            return {
                ...state,
            };
        case TYPES.TRASH_USER_SUCCESS:
            data = action.payload.data;
            return {
                ...state,
                lastsUsers: data,
            };
        case TYPES.RESTORE_TRASH_USER:
            return {
                ...state,
            }
        case TYPES.RESTORE_TRASH_USER_SUCCESS:
            lastsUsers = state.lastsUsers;
            arrayIds = action.payload.arrayIds;
            newListUser = myArray(lastsUsers, arrayIds);
            toast.success('Restore Successfully 😀');
            return {
                ...state,
                lastsUsers: newListUser,
            }
        case TYPES.DELETED_FOREVER_USER:
            return {
                ...state,
            }
        case TYPES.DELETED_FOREVER_USER_SUCCESS:
            lastsUsers = state.lastsUsers;
            arrayIds = action.payload.arrayIds;
            newListUser = myArray(lastsUsers, arrayIds);
            toast.success('Deleted Successfully 😀');
            return {
                ...state,
                lastsUsers: newListUser,
            }
        case TYPES.GET_ALL_ID_USER:
            return {
                ...state,
            };
        case TYPES.GET_ALL_ID_USER_SUCCESS:
            data = action.payload.data;
            return {
                ...state,
                listUsers: data
            };
        default:
            return state;
    }
};
export default reducer;
