import * as TYPES from '../constants/signInUp';
export const SignIn = (value) => {
    return {
        type: TYPES.SIGN_IN,
        payload: { value },
    };
};
export const SignInSuccess = (data) => {
    return {
        type: TYPES.SIGN_IN_SUCCESS,
        payload: { data },
    };
};

export const updateUser = (dataImg, user, check) => {
    return {
        type: TYPES.UPDATE_USER,
        payload: { dataImg, user, check },
    };
};
export const updateUserSuccess = (data) => {
    return {
        type: TYPES.UPDATE_USER_SUCCESS,
        payload: { data },
    };
};

export const updateUserAdmin = (dataImg, user, check) => {
    return {
        type: TYPES.UPDATE_USER_ADMIN,
        payload: { dataImg, user, check },
    };
};
export const updateUserAdminSuccess = (data) => {
    return {
        type: TYPES.UPDATE_USER_ADMIN_SUCCESS,
        payload: { data },
    };
};

export const findUser = (id) => {
    return {
        type: TYPES.FIND_USER,
        payload: { id },
    };
};
export const findUserSuccess = (data) => {
    return {
        type: TYPES.FIND_USER_SUCCESS,
        payload: { data },
    };
};

export const SignUp = (value) => {
    return {
        type: TYPES.SIGN_UP,
        payload: { value },
    };
};
export const SignUpSuccess = (data) => {
    return {
        type: TYPES.SIGN_UP_SUCCESS,
        payload: { data },
    };
};
export const addUser = (value) => {
    return {
        type: TYPES.ADD_USER,
        payload: { value },
    };
};
export const addUserSuccess = (data) => {
    return {
        type: TYPES.ADD_USER_SUCCESS,
        payload: { data },
    };
};
export const CountUser = () => {
    return {
        type: TYPES.COUNT_USER,
    };
};
export const CountUserSuccess = (data) => {
    return {
        type: TYPES.COUNT_USER_SUCCESS,
        payload: { data },
    };
};
export const LastsUser = (start, end) => {
    return {
        type: TYPES.LASTS_USER,
        payload: { start, end }
    };
};
export const LastsUserSuccess = (data) => {
    return {
        type: TYPES.LASTS_USER_SUCCESS,
        payload: { data },
    };
};

export const transactionsUser = () => {
    return {
        type: TYPES.TRANSACTIONS_USER,
    };
};
export const transactionsUserSuccess = (data) => {
    return {
        type: TYPES.TRANSACTIONS_USER_SUCCESS,
        payload: { data },
    };
};

export const SignError = (error) => {
    return {
        type: TYPES.SIGN_ERROR,
        payload: { error },
    };
};
export const SignOut = () => {
    return {
        type: TYPES.SIGN_OUT,
    };
};
export const deletedUser = (arrayIds) => {
    return {
        type: TYPES.DELETED_USER,
        payload: { arrayIds }
    }
}
export const deletedUserSuccess = (data, arrayIds) => {
    return {
        type: TYPES.DELETED_USER_SUCCESS,
        payload: { data, arrayIds }
    }
}
export const trashUser = () => {
    return {
        type: TYPES.TRASH_USER,
    }
}
export const trashUserSuccess = (data) => {
    return {
        type: TYPES.TRASH_USER_SUCCESS,
        payload: { data }
    }
}

export const deletedForever = (arrayIds) => {
    return {
        type: TYPES.DELETED_FOREVER_USER,
        payload: { arrayIds }
    }
}
export const deletedForeverSuccess = (data, arrayIds) => {
    return {
        type: TYPES.DELETED_FOREVER_USER_SUCCESS,
        payload: { data, arrayIds }
    }
}
export const restoreTrash = (arrayIds) => {
    return {
        type: TYPES.RESTORE_TRASH_USER,
        payload: { arrayIds }
    }
}
export const restoreTrashSuccess = (data, arrayIds) => {
    return {
        type: TYPES.RESTORE_TRASH_USER_SUCCESS,
        payload: { data, arrayIds }
    }
}
export const getALLIdsUser = () => {
    return {
        type: TYPES.GET_ALL_ID_USER,
    };
};
export const getALLIdsUserSuccess = (data) => {
    return {
        type: TYPES.GET_ALL_ID_USER_SUCCESS,
        payload: { data },
    };
};