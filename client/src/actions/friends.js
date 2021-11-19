import * as TYPES from '../constants/friends';
export const checkFriends = (id) => {
    return {
        type: TYPES.CHECK_FRIEND,
        payload: { id }
    };
};
export const checkFriendsSuccess = (data) => {
    return {
        type: TYPES.CHECK_FRIEND_SUCCESS,
        payload: { data },
    };
};

export const requestFriends = (id) => {
    return {
        type: TYPES.ADD_FRIEND,
        payload: { id }
    };
};
export const requestFriendsSuccess = (data) => {
    return {
        type: TYPES.ADD_FRIEND_SUCCESS,
        payload: { data },
    };
};

export const acceptFriends = (id) => {
    return {
        type: TYPES.ACCEPT_FRIEND,
        payload: { id }
    };
};
export const declineFriends = (id) => {
    return {
        type: TYPES.DECLINE_FRIEND,
        payload: { id }
    };
};

export const removeFriends = (id) => {
    return {
        type: TYPES.REMOVE_FRIEND,
        payload: { id }
    };
};
export const getRequestFriends = (id) => {
    return {
        type: TYPES.LIST_REQUEST_FRIEND,
        payload: { id }
    };
};
export const getRequestFriendsSuccess = (data) => {
    return {
        type: TYPES.LIST_REQUEST_FRIEND_SUCCESS,
        payload: { data },
    };
};

export const getFriends = (id) => {
    return {
        type: TYPES.LIST_FRIEND,
        payload: { id }
    };
};
export const getFriendsSuccess = (data) => {
    return {
        type: TYPES.LIST_FRIEND_SUCCESS,
        payload: { data },
    };
};

export const friendError = (err) => {
    return {
        type: TYPES.FRIEND_ERROR,
        payload: { err },
    };
};