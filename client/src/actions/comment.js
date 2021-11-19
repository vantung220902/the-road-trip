import * as TYPES from '../constants/comment';
export const watchComment = (id) => {
    return {
        type: TYPES.GET_COMMENT,
        payload: { id }
    };
};
export const watchCommentSuccess = (data) => {
    return {
        type: TYPES.GET_COMMENT_SUCCESS,
        payload: { data },
    };
};

export const addComment = (comment) => {
    return {
        type: TYPES.ADD_COMMENT,
        payload: { comment }
    };
};
export const addCommentSuccess = (data) => {
    return {
        type: TYPES.ADD_COMMENT_SUCCESS,
        payload: { data },
    };
};

export const deleteComment = (id) => {
    return {
        type: TYPES.DELETE_COMMENT,
        payload: { id }
    };
};
export const deleteCommentSuccess = (data) => {
    return {
        type: TYPES.DELETE_COMMENT_SUCCESS,
        payload: { data },
    };
};

export const commentError = (error) => {
    return {
        type: TYPES.COMMENT_ERROR,
        payload: { error },
    };
};
