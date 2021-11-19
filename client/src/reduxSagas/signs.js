import * as TypeSigns from '../constants/signInUp';
import * as actionSigns from '../actions/signInUp';
import { call, put, delay, takeLatest } from 'redux-saga/effects';
import {
    signInAPI, signUpAPI, findEmailAPI, updateUserAPI,
    findUserAPI, countUserAPI, lastsUserAPI, transactionsUserAPI
    , deletedForeverUserAPI, deletedUserAPI, getTrashUserAPI,
    restoreUserAPI, getAllIdsAPI
} from '../apis/signAPI';
import { ShowLoading, HideLoading } from '../actions/ui';
import { toast } from 'react-toastify';
import { uploadImgAPI } from '../apis/uploadImg';
function* findAccount(value) {
    try {
        const response = yield call(findEmailAPI, value);
        const { data, status } = response;
        console.log(data);
        if (status === 200) {
            return data;
        }
    } catch (e) {
        return e;
    }
    return null;
}
function* SignIn({ payload }) {

    yield put(ShowLoading());
    const { value } = payload;
    try {
        const response = yield call(signInAPI, value);
        const { data, status } = response;
        if (status === 200) {
            yield put(actionSigns.SignInSuccess(data));
        }
    } catch (e) {
        yield put(actionSigns.SignError(e));
    }
    yield delay(1000);
    yield put(HideLoading());
}
function* SignUp({ payload }) {
    yield put(ShowLoading());
    const { value } = payload;
    const acc = {
        email: value.email,
    };
    const result = yield findAccount(acc.email);
    if (Array.isArray(result) && result.length === 0) {
        try {
            const response = yield call(signUpAPI, value);
            const { data, status } = response;
            if (status === 201) {
                console.log(data);
                yield put(actionSigns.SignUpSuccess(data));
            }
        } catch (e) {
            yield put(actionSigns.SignError(e));
        }
    } else if (Array.isArray(result) && result.length > 0) {
        toast.error('Email is already exists', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    yield delay(1000);
    yield put(HideLoading());
}
function* addUser({ payload }) {
    yield put(ShowLoading());
    const { value } = payload;
    const acc = {
        email: value.email,
    };
    const result = yield findAccount(acc.email);
    if (Array.isArray(result) && result.length === 0) {
        try {
            const response = yield call(signUpAPI, value);
            const { data, status } = response;
            if (status === 201) {
                console.log(data);
                yield put(actionSigns.addUserSuccess(data));
            }
        } catch (e) {
            yield put(actionSigns.SignError(e));
        }
    } else if (Array.isArray(result) && result.length > 0) {
        toast.error('Email is already exists', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    yield delay(1000);
    yield put(HideLoading());
}
function* updateUser({ payload }) {
    yield put(ShowLoading());
    try {
        const { dataImg, user, check } = payload;
        if (check) {
            const responseImg = yield call(uploadImgAPI, dataImg);
            const urlImg = responseImg.data.url;
            const statusImg = responseImg.status;
            if (statusImg === 200) {
                const response = yield call(updateUserAPI, {
                    ...user,
                    avt: urlImg,
                });
                const { data, status } = response;
                if (status === 200) {
                    yield put(actionSigns.updateUserSuccess(data));
                }
            }
        } else {
            const response = yield call(updateUserAPI, {
                avt: dataImg,
                ...user,
            });
            const { data, status } = response;
            if (status === 200) {
                yield put(actionSigns.updateUserSuccess(data));
            }
        }

    } catch (e) {
        yield put(actionSigns.SignError(e));
    }
    yield delay(1000);
    yield put(HideLoading());
}
function* updateUserAdmin({ payload }) {
    yield put(ShowLoading());
    try {
        const { dataImg, user, check } = payload;
        if (check) {
            const responseImg = yield call(uploadImgAPI, dataImg);
            const urlImg = responseImg.data.url;
            const statusImg = responseImg.status;
            if (statusImg === 200) {
                const response = yield call(updateUserAPI, {
                    ...user,
                    avt: urlImg,
                });
                const { data, status } = response;
                if (status === 200) {
                    yield put(actionSigns.updateUserAdminSuccess(data));
                }
            }
        } else {
            const response = yield call(updateUserAPI, {
                avt: dataImg,
                ...user,
            });
            const { data, status } = response;
            if (status === 200) {
                yield put(actionSigns.updateUserAdminSuccess(data));
            }
        }

    } catch (e) {
        yield put(actionSigns.SignError(e));
    }
    yield delay(1000);
    yield put(HideLoading());
}
function* findUser({ payload }) {
    const { id } = payload;
    try {
        const response = yield call(findUserAPI, id);
        const { data, status } = response;
        if (status === 200) {
            yield put(actionSigns.findUserSuccess(data));
        }
    } catch (e) {
        yield put(actionSigns.SignError(e));
    }

}
function* countUser() {
    try {
        const response = yield call(countUserAPI);
        const { data, status } = response;
        if (status === 200) {
            yield put(actionSigns.CountUserSuccess(data));
        }
    } catch (e) {
        yield put(actionSigns.SignError(e));
    }
}
function* lastsUser({ payload }) {
    const { start, end } = payload;
    try {
        const response = yield call(lastsUserAPI, start, end);
        const { data, status } = response;
        if (status === 200) {
            yield put(actionSigns.LastsUserSuccess(data));
        }
    } catch (e) {
        yield put(actionSigns.SignError(e));
    }
}
function* transactionsUser() {
    try {
        const response = yield call(transactionsUserAPI);
        const { data, status } = response;
        if (status === 200) {
            yield put(actionSigns.transactionsUserSuccess(data));
        }
    } catch (e) {
        yield put(actionSigns.SignError(e));
    }
}
function* deletedUser({ payload }) {
    yield put(ShowLoading());
    const { arrayIds } = payload;
    try {
        const response = yield call(deletedUserAPI, arrayIds);
        const { data, status } = response;
        if (status === 200) {
            yield put(actionSigns.deletedUserSuccess(data, arrayIds));
        }
    } catch (e) {
        yield put(actionSigns.SignError(e));
    }
    yield delay(1000);
    yield put(HideLoading());
}
function* trashUser() {
    yield put(ShowLoading());
    try {
        const response = yield call(getTrashUserAPI);
        const { data, status } = response;
        if (status === 200) {
            yield put(actionSigns.trashUserSuccess(data));
        }
    } catch (e) {
        yield put(actionSigns.SignError(e));
    }
    yield delay(1000);
    yield put(HideLoading());
}
function* restoreUser({ payload }) {
    yield put(ShowLoading());
    const { arrayIds } = payload;
    try {
        const response = yield call(restoreUserAPI, arrayIds);
        const { data, status } = response;
        if (status === 200) {
            yield put(actionSigns.restoreTrashSuccess(data, arrayIds));
        }
    } catch (e) {
        yield put(actionSigns.SignError(e));
    }
    yield delay(1000);
    yield put(HideLoading());
}
function* deletedForeverUser({ payload }) {
    yield put(ShowLoading());
    const { arrayIds } = payload;
    try {
        const response = yield call(deletedForeverUserAPI, arrayIds);
        const { data, status } = response;
        if (status === 200) {
            yield put(actionSigns.deletedForeverSuccess(data, arrayIds));
        }
    } catch (e) {
        yield put(actionSigns.SignError(e));
    }
    yield delay(1000);
    yield put(HideLoading());
}
function* getAllIDs() {
    try {
        const response = yield call(getAllIdsAPI);
        const { data, status } = response;
        if (status === 200) {
            yield put(actionSigns.getALLIdsUserSuccess(data));
        }
    } catch (e) {
        yield put(actionSigns.SignError(e));
    }

}
export const signSagas = [
    takeLatest(TypeSigns.SIGN_IN, SignIn),
    takeLatest(TypeSigns.SIGN_UP, SignUp),
    takeLatest(TypeSigns.UPDATE_USER, updateUser),
    takeLatest(TypeSigns.UPDATE_USER_ADMIN, updateUserAdmin),
    takeLatest(TypeSigns.FIND_USER, findUser),
    takeLatest(TypeSigns.COUNT_USER, countUser),
    takeLatest(TypeSigns.LASTS_USER, lastsUser),
    takeLatest(TypeSigns.TRANSACTIONS_USER, transactionsUser),
    takeLatest(TypeSigns.DELETED_USER, deletedUser),
    takeLatest(TypeSigns.TRASH_USER, trashUser),
    takeLatest(TypeSigns.RESTORE_TRASH_USER, restoreUser),
    takeLatest(TypeSigns.DELETED_FOREVER_USER, deletedForeverUser),
    takeLatest(TypeSigns.ADD_USER, addUser),
    takeLatest(TypeSigns.GET_ALL_ID_USER, getAllIDs)
]