import * as TYPES from '../constants/post';
export const watchPost = (param = {}) => {
    return {
        type: TYPES.GET_POST,
        payload: { param }
    };
};
export const watchPostSuccess = (data) => {
    return {
        type: TYPES.GET_POST_SUCCESS,
        payload: { data },
    };
};

export const addPost = (dataImg, dataForm) => {
    return {
        type: TYPES.ADD_POST,
        payload: { dataImg, dataForm }
    };
};
export const addPostSuccess = (data) => {
    return {
        type: TYPES.ADD_POST_SUCCESS,
        payload: { data },
    };
};
export const loadMorePost = (param = {}) => {
    return {
        type: TYPES.LOAD_MORE_POST,
        payload: { param },
    };
};
export const loadMorePostSuccess = (data) => {
    return {
        type: TYPES.LOAD_MORE_POST_SUCCESS,
        payload: { data },
    };
};
export const likePost = (param) => {
    return {
        type: TYPES.LIKE_POST,
        payload: { param },
    };
};

export const myPost = (id) => {
    return {
        type: TYPES.MY_POST,
        payload: { id },
    };
};
export const myPostSuccess = (data) => {
    return {
        type: TYPES.MY_POST_SUCCESS,
        payload: { data },
    };
};

export const findPost = (id) => {
    return {
        type: TYPES.FIND_POST,
        payload: { id },
    };
};
export const findPostSuccess = (data) => {
    return {
        type: TYPES.FIND_POST_SUCCESS,
        payload: { data },
    };
};

export const postError = (error) => {
    return {
        type: TYPES.POST_ERROR,
        payload: { error },
    };
};

export const updatePost = (id, dataImg, post, check) => {
    return {
        type: TYPES.UPDATE_POST,
        payload: { id, dataImg, post, check },
    };
};
export const updatePostSuccess = (data) => {
    return {
        type: TYPES.UPDATE_POST_SUCCESS,
        payload: { data },
    };
};
export const deletedPosts = (arrayIds) => {
    return {
        type: TYPES.DELETE_POST,
        payload: { arrayIds }
    }
}
export const deletedPostsSuccess = (data, arrayIds) => {
    return {
        type: TYPES.DELETE_POST_SUCCESS,
        payload: { data, arrayIds }
    }
}

export const countPost = (month) => {
    return {
        type: TYPES.COUNT_POST,
        payload: { month },
    };
};
export const countPostSuccess = (data) => {
    return {
        type: TYPES.COUNT_POST_SUCCESS,
        payload: { data },
    };
};
export const numberPost = () => {
    return {
        type: TYPES.NUMBER_POST,
    };
};
export const numberPostSuccess = (data) => {
    return {
        type: TYPES.NUMBER_POST_SUCCESS,
        payload: { data },
    };
};