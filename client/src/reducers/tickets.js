import * as TYPES from '../constants/tickets';
import { toastError } from '../comom/tostHelper';
import { toast } from 'react-toastify';
const init = {
    listTickets: [],
    ticket: null,
    count: 0,

};
const myArray = (listTickets, arrayIds) => {
    let index = -1;
    arrayIds.forEach(id => {
        index = listTickets.findIndex((t) => {
            return t.id === parseInt(id, 10)
        });
        if (index !== -1) {
            listTickets = [
                ...listTickets.slice(0, index),
                ...listTickets.slice(index + 1)
            ]
        }
    });
    return listTickets;
}
const reducer = (state = init, action) => {
    let data,
        error,
        listTickets,
        newListTickets,
        arrayIds,
        ticket = null;
    let index = -1;
    switch (action.type) {
        case TYPES.GET_TICKETS:
            return {
                ...state,
                listTickets: [],
            };
        case TYPES.GET_TICKETS_SUCCESS:
            data = action.payload.data;
            listTickets = state.listTickets;
            return {
                ...state,
                listTickets: listTickets.concat(data),
            };

        case TYPES.LOAD_MORE:
            return {
                ...state,
            };
        case TYPES.LOAD_MORE_SUCCESS:
            data = action.payload.data;
            listTickets = state.listTickets;
            return {
                ...state,
                listTickets: listTickets.concat(data),
            };

        case TYPES.FIND_ID_TICKET:
            return {
                ...state,
            };
        case TYPES.FIND_ID_TICKET_SUCCESS:
            data = action.payload.data;
            ticket = Array.isArray(data) ? data[0] : data;
            return {
                ...state,
                ticket: ticket,
            };

        case TYPES.FILTER_TICKETS:
            return { ...state };
        case TYPES.FILTER_TICKETS_SUCCESS:
            data = action.payload.data;
            return { ...state, listTickets: data };
        case TYPES.GET_TICKETS_APPROVAL:
            return { ...state };
        case TYPES.GET_TICKETS_APPROVAL_SUCCESS:
            data = action.payload.data;
            return { ...state, listTickets: data };
        case TYPES.GET_TICKETS_ADMIN:
            return { ...state };
        case TYPES.GET_TICKETS_ADMIN_SUCCESS:
            data = action.payload.data;
            return { ...state, listTickets: data };
        case TYPES.CREATE_TICKET:
            return {
                ...state,
            };
        case TYPES.CREATE_TICKET_SUCCESS:
            data = action.payload.data;
            data.status = 0;
            newListTickets = [
                ...state.listTickets,
                data,
            ];
            toast.success('Create Successfully 😀');
            return {
                ...state,
                listTickets: newListTickets
            };

        case TYPES.WATCH_TICKET_SELL:
            return {
                ...state,
            };
        case TYPES.WATCH_TICKET_SELL_SUCCESS:
            data = action.payload.data;
            return {
                ...state,
                listTickets: data,
            };

        case TYPES.UPDATE_TICKET:
            return {
                ...state,
            }
        case TYPES.UPDATE_TICKET_SUCCESS:
            data = action.payload.data;
            listTickets = state.listTickets;
            index = listTickets.findIndex(item => item.id === data.id);
            if (index !== -1) {
                const newListTickets = [
                    ...listTickets.slice(0, index),
                    data,
                    ...listTickets.slice(index + 1)
                ]
                toast.success('Update Successfully 😀');
                return {
                    ...state,
                    listTickets: newListTickets,
                }
            }
            return {
                ...state,
            }
        case TYPES.UPDATE_TICKET_ADMIN:
            return {
                ...state,
            }
        case TYPES.UPDATE_TICKET_ADMIN_SUCCESS:
            data = action.payload.data;
            toast.success('Update Successfully 😀');
            return {
                ...state,
                ticket: data,
            }
        case TYPES.DELETED_TICKETS:
            return {
                ...state,
            }
        case TYPES.DELETED_TICKETS_SUCCESS:
            listTickets = state.listTickets;
            arrayIds = action.payload.arrayIds;
            newListTickets = myArray(listTickets, arrayIds);
            toast.success('Deleted Successfully 😀');
            return {
                ...state,
                listTickets: newListTickets,
            }
        case TYPES.TRASH_TICKETS:
            return {
                ...state,
            };
        case TYPES.TRASH_TICKETS_ADMIN:
            return {
                ...state,
            };
        case TYPES.TRASH_TICKETS_SUCCESS:
            data = action.payload.data;
            return {
                ...state,
                listTickets: data,
            };
        case TYPES.RESTORE_TRASH_TICKETS:
            return {
                ...state,
            }
        case TYPES.RESTORE_TRASH_TICKETS_SUCCESS:
            listTickets = state.listTickets;
            arrayIds = action.payload.arrayIds;
            newListTickets = myArray(listTickets, arrayIds);
            toast.success('Restore Successfully 😀');
            return {
                ...state,
                listTickets: newListTickets,
            }
        case TYPES.DELETED_FOREVER_TICKETS:
            return {
                ...state,
            }
        case TYPES.DELETED_FOREVER_TICKETS_SUCCESS:
            listTickets = state.listTickets;
            arrayIds = action.payload.arrayIds;
            newListTickets = myArray(listTickets, arrayIds);
            toast.success('Deleted Forever Successfully 😀');
            return {
                ...state,
                listTickets: newListTickets,
            }
        case TYPES.ACCEPT_TICKET:
            return {
                ...state,
            }
        case TYPES.ACCEPT_TICKET_SUCCESS:
            listTickets = state.listTickets;
            arrayIds = action.payload.arrayIds;
            newListTickets = myArray(listTickets, arrayIds);
            toast.success('Accept Successfully 😀');
            return {
                ...state,
                listTickets: newListTickets,
            }
        case TYPES.COUNT_SELL_TICKETS:
            return {
                ...state,
            }
        case TYPES.COUNT_SELL_TICKETS_SUCCESS:
            data = action.payload.data;
            let page = Math.ceil(data / 6);

            return {
                ...state,
                count: page

            }
        case TYPES.NUMBER_TICKETS:
            return {
                ...state,
            }
        case TYPES.NUMBER_TICKETS_SUCCESS:
            data = action.payload.data;
            return {
                ...state,
                count: data[0].sum

            }
        case TYPES.ERROR:
            error = action.payload.error;
            toastError(error);
            return {
                ...state,
            };
        case TYPES.FILTER_TICKETS_BY_AUTHOR:
            return {
                ...state,
            }
        case TYPES.FILTER_TICKETS_BY_AUTHOR_SUCCESS:
            data = action.payload.data;
            return { ...state, listTickets: data };
        case TYPES.GET_ALL_ID:
            return {
                ...state,
            }
        case TYPES.GET_ALL_ID_SUCCESS:
            data = action.payload.data;
            return { ...state, listTickets: data };
        default:
            return state;
    }
};
export default reducer;
