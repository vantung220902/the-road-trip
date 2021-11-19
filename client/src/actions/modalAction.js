import * as modelTYPES from '../constants/modal';
export const showModel = () => ({
    type: modelTYPES.SHOW_MODEL,
});
export const hideModel = () => ({
    type: modelTYPES.HIDE_MODEL,
});
export const ChangeModelTitle = (title) => ({
    type: modelTYPES.CHANGE_MODEL_TITLE,
    payload: { title },
});
export const ChangeModel = (component, height) => ({
    type: modelTYPES.CHANGE_MODEL_CONTET,
    payload: { component, height },
});
