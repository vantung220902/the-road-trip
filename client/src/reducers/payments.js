import * as TYPES from '../constants/payment';
import { toastError } from '../comom/tostHelper';
import { toast } from 'react-toastify';
const init = {
    listPayments: [],
    payment: null,
    count: 0,
    listLasts: [],
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

    return listPayments;
}
const reducer = (state = init, action) => {
    let data,
        newListPayments,
        listPayments,
        arrayIds,
        error = null;
    switch (action.type) {
        case TYPES.PAYMENTS:
            return {
                ...state,
            };
        case TYPES.PAYMENTS_SUCCESS:
            toast.success('Purchase ticket success', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            data = action.payload.data;
            return {
                ...state,
                payment: data,
            };
        case TYPES.ERROR:
            error = action.payload.error;
            toastError(error);
            console.log(error);
            return {
                ...state,
            };
        case TYPES.WATCH_TICKET_BUY:
            return {
                ...state,
            };
        case TYPES.WATCH_TICKET_BUY_SUCCESS:
            data = action.payload.data;
            return {
                ...state,
                listPayments: data,
            };
        case TYPES.WATCH_ID_ACC_BUY:
            return {
                ...state,
            };
        case TYPES.WATCH_ID_ACC_BUY_SUCCESS:
            data = action.payload.data;
            return {
                ...state,
                listPayments: data,
            };
        case TYPES.DELETED_PAYMENT:
            return {
                ...state,
            }
        case TYPES.DELETED_PAYMENT_SUCCESS:
            listPayments = state.listPayments;
            arrayIds = action.payload.arrayIds;
            newListPayments = myArray(listPayments, arrayIds);
            toast.success('Deleted Successfully 😀');
            return {
                ...state,
                listPayments: newListPayments,
            }
        case TYPES.TRASH_PAYMENT:
            return {
                ...state,
            };
        case TYPES.TRASH_PAYMENT_SUCCESS:
            data = action.payload.data;
            return {
                ...state,
                listPayments: data,
            };
        case TYPES.RESTORE_TRASH_PAYMENT:
            return {
                ...state,
            }
        case TYPES.RESTORE_TRASH_PAYMENT_SUCCESS:

            listPayments = state.listPayments;
            arrayIds = action.payload.arrayIds;
            newListPayments = myArray(listPayments, arrayIds);
            toast.success('Restore Successfully 😀');
            return {
                ...state,
                listPayments: newListPayments,
            }
        case TYPES.DELETED_FOREVER_PAYMENT:
            return {
                ...state,
            }
        case TYPES.DELETED_FOREVER_PAYMENT_SUCCESS:

            listPayments = state.listPayments;
            arrayIds = action.payload.arrayIds;
            newListPayments = myArray(listPayments, arrayIds);
            toast.success('Deleted Successfully 😀');
            return {
                ...state,
                listPayments: newListPayments,
            }
        case TYPES.COUNT_BUY:
            return {
                ...state,
            }
        case TYPES.COUNT_BUY_SUCCESS:
            data = action.payload.data;
            let page = Math.ceil(data / 6);
            return {
                ...state,
                count: page

            }
        case TYPES.SEARCH_TICKET_BUY:
            return {
                ...state,
            };
        case TYPES.SEARCH_TICKET_BUY_SUCCESS:
            data = action.payload.data;
            return {
                ...state,
                listPayments: data,
            };
        case TYPES.REVENUE_PAYMENT:
            return {
                ...state,
            };
        case TYPES.REVENUE_PAYMENT_SUCCESS:
            data = action.payload.data;
            return {
                ...state,
                listPayments: data
            };
        case TYPES.LASTS_PAYMENTS:
            return {
                ...state,
            };
        case TYPES.LASTS_PAYMENTS_SUCCESS:
            data = action.payload.data;
            return {
                ...state,
                listLasts: data
            };
        case TYPES.TRANSACTION_PAYMENT:
            return {
                ...state,
            };
        case TYPES.TRANSACTION_PAYMENT_SUCCESS:
            data = action.payload.data;
            return {
                ...state,
                listPayments: data
            };
        case TYPES.FIND_PAYMENT:
            return {
                ...state,
            };
        case TYPES.FIND_PAYMENT_SUCCESS:
            data = action.payload.data;
            return {
                ...state,
                payment: data[0]
            };
        case TYPES.UPDATE_PAYMENT:
            const { payment } = action.payload;
            return {
                ...state,
                payment: payment
            };
        case TYPES.UPDATE_PAYMENT_SUCCESS:
            toast.success('Updated Successfully 😀');
            return {
                ...state,
            };
        case TYPES.TRASH_PAYMENT_ADMIN:
            return {
                ...state,
            };
        case TYPES.TRASH_PAYMENT_ADMIN_SUCCESS:
            data = action.payload.data;
            return {
                ...state,
                listPayments: data
            };
        default:
            return state;
    }
};
export default reducer;
