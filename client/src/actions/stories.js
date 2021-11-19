import * as TYPES from '../constants/stories';
export const watchStories = () => {
    return {
        type: TYPES.GET_STORIES,
    };
};
export const watchStoriesSuccess = (data) => {
    return {
        type: TYPES.GET_STORIES_SUCCESS,
        payload: { data },
    };
};

export const addStories = (dataImg, dataForm) => {
    return {
        type: TYPES.ADD_STORIES,
        payload: { dataImg, dataForm }
    };
};
export const addStoriesSuccess = (data) => {
    return {
        type: TYPES.ADD_STORIES_SUCCESS,
        payload: { data },
    };
};

export const deleteStories = (id) => {
    return {
        type: TYPES.DELETE_STORIES,
        payload: { id }
    };
};
export const deleteStoriesSuccess = (data) => {
    return {
        type: TYPES.DELETE_STORIES_SUCCESS,
        payload: { data },
    };
};

export const storiesError = (error) => {
    return {
        type: TYPES.STORIES_ERROR,
        payload: { error },
    };
};
