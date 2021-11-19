import * as TYPE from '../constants/stories';
const init = {
    listStories: [],
};
const reducer = (state = init, action) => {
    let data, newListTickets = null;
    switch (action.type) {
        case TYPE.GET_STORIES:
            return {
                ...state,
            };
        case TYPE.GET_STORIES_SUCCESS:
            data = action.payload.data;
            return {
                ...state,
                listStories: data,
            };
        case TYPE.ADD_STORIES:
            return {
                ...state,
            }
        case TYPE.ADD_STORIES_SUCCESS:
            data = action.payload.data;
            newListTickets = [
                data,
                ...state.listStories,
            ];
            return {
                ...state,
                listStories: newListTickets,

            };
        case TYPE.DELETE_STORIES:
            return {
                ...state,
            }
        case TYPE.DELETE_STORIES_SUCCESS:
            data = action.payload.data;
            console.log(data, data.id);
            const index = state.listStories.findIndex(e => {
                return e.id === parseInt(data.id, 10);
            });
            if (index !== -1) {
                newListTickets = [
                    ...state.listStories.slice(0, index),
                    ...state.listStories.slice(index + 1)
                ]
                console.log(newListTickets);
                return {
                    ...state,
                    listStories: newListTickets
                }
            }
            return {
                ...state,
            };
        case TYPE.STORIES_ERROR:
            const { error } = action.payload;
            console.log(error);
            return {
                ...state,
            };
        default:
            return state;
    }
};
export default reducer;
