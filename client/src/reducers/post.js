import * as TYPE from '../constants/post';
import { toastError } from '../comom/tostHelper';
import { toast } from 'react-toastify';
const init = {
    listPost: [],
    count: true,
    now: 0, //
    last: 0,

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
    let data, newListPost, listPost, arrayIds = null;
    switch (action.type) {
        case TYPE.GET_POST:
            return {
                ...state,
            };
        case TYPE.GET_POST_SUCCESS:
            data = action.payload.data;
            listPost = state.listPost;
            return {
                ...state,
                listPost: listPost.concat(data),
            };
        case TYPE.MY_POST:
            return {
                ...state,
            };
        case TYPE.MY_POST_SUCCESS:
            data = action.payload.data;
            return {
                ...state,
                listPost: data,
            };
        case TYPE.FIND_POST:
            return {
                ...state,
            };
        case TYPE.FIND_POST_SUCCESS:
            data = action.payload.data;
            return {
                ...state,
                listPost: data,
            };
        case TYPE.LOAD_MORE_POST:
            return {
                ...state,
            };
        case TYPE.LOAD_MORE_POST_SUCCESS:
            data = action.payload.data;
            listPost = state.listPost;
            return {
                ...state,
                listPost: listPost.concat(data),
            };
        case TYPE.ADD_POST:
            return {
                ...state,
            }
        case TYPE.ADD_POST_SUCCESS:
            data = action.payload.data;
            toast.success('Created Successfully 😀');
            newListPost = [
                data,
                ...state.listPost,
            ];
            return {
                ...state,
                listPost: newListPost
            };
        case TYPE.DELETE_POST:
            return {
                ...state,
            }
        case TYPE.DELETE_POST_SUCCESS:
            arrayIds = action.payload.arrayIds;
            newListPost = myArray(state.listPost, arrayIds);
            toast.success('Deleted Successfully 😀');
            return {
                ...state,
                listPost: newListPost,
            }
        case TYPE.UPDATE_POST:
            return {
                ...state,
            }
        case TYPE.UPDATE_POST_SUCCESS:
            data = action.payload.data;
            listPost = state.listPost;
            const index = listPost.findIndex(item => item.id === data.id);
            const value = {
                ...listPost[index],
                ...data,

            }
            if (index !== -1) {
                newListPost = [
                    ...listPost.slice(0, index),
                    value,
                    ...listPost.slice(index + 1)
                ]
                toast.success('Update Successfully 😀');
                return {
                    ...state,
                    listPost: newListPost,
                }
            }
            return {
                ...state,
            }
        case TYPE.LIKE_POST:
            return {
                ...state,
            }
        case TYPE.POST_ERROR:
            const { error } = action.payload;
            toastError(error);
            console.log(error);
            return {
                ...state,
            };
        case TYPE.COUNT_POST:
            return {
                ...state,
            };
        case TYPE.COUNT_POST_SUCCESS:
            data = action.payload.data;
            return {
                ...state,
                now: data[0].now,
                last: data[0].last
            };
        case TYPE.NUMBER_POST:
            return {
                ...state,
            }
        case TYPE.NUMBER_POST_SUCCESS:
            data = action.payload.data;
            return {
                ...state,
                count: data[0].count

            }
        default:
            return state;
    }
};
export default reducer;
