import * as TYPES from '../constants/modal';
const init = {
    showModel: false,
    title: '',
    component: null,
    height: 'auto'
};
const reducer = (state = init, action) => {
    switch (action.type) {
        case TYPES.SHOW_MODEL:
            return {
                ...state,
                showModel: true,
            };
        case TYPES.HIDE_MODEL:
            return {
                ...state,
                showModel: false,
                title: '',
                component: null,
            };
        case TYPES.CHANGE_MODEL_TITLE:
            const { title } = action.payload;
            return {
                ...state,
                title,
            };
        case TYPES.CHANGE_MODEL_CONTET:
            const { component, height } = action.payload;
            return {
                ...state,
                component,
                height: height ? height : state.height,
            };
        default:
            return state;
    }
};
export default reducer;
