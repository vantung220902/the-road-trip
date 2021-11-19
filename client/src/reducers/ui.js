import * as TYPES from '../constants/ui';
const init = {
    showLoading: false,
    toggled: false,
    tabDetails: 0,
    tabs: 0,
    openChat: false,
    idReceive: -1,
};
const reducer = (state = init, action) => {
    let value = null;
    switch (action.type) {
        case TYPES.TOGGLE_DARK:
            const { toggled } = action.payload;
            return {
                ...state,
                toggled: !toggled,
            };

        case TYPES.SHOW_LOADING:
            return {
                ...state,
                showLoading: true,
            };

        case TYPES.HIDE_LOADING:
            return {
                ...state,
                showLoading: false,
            };
        case TYPES.RENDER_TABS_DETAIL:
            value = action.payload.value;
            return {
                ...state,
                tabDetails: value,
            };
        case TYPES.HANDLE_TABS:
            value = action.payload.value;
            return {
                ...state,
                tabs: value,
            };
        case TYPES.SHOW_CHAT_BOX:
            const { idReceive } = action.payload;
            return {
                ...state,
                openChat: true,
                idReceive: idReceive
            };
        case TYPES.HIDE_CHAT_BOX:
            return {
                ...state,
                openChat: false,
            };
        default:
            return state;
    }
};
export default reducer;
