import * as TYPES from '../constants/ui';
export const ToggleDark = (value) => {
    return {
        type: TYPES.TOGGLE_DARK,
        payload: {
            toggled: value,
        },
    };
};
export const ShowLoading = () => {
    return {
        type: TYPES.SHOW_LOADING,
    };
};
export const HideLoading = () => {
    return {
        type: TYPES.HIDE_LOADING,
    };
};
export const RenderTabsDetail = (value) => {
    return {
        type: TYPES.RENDER_TABS_DETAIL,
        payload: { value },
    };
};
export const HandleTabs = (value) => {
    return {
        type: TYPES.HANDLE_TABS,
        payload: { value },
    };
};
export const showChatBox = (idReceive) => ({
    type: TYPES.SHOW_CHAT_BOX,
    payload: { idReceive },
});

export const hideChatBox = () => ({
    type: TYPES.HIDE_CHAT_BOX,
});

