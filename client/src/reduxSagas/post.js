import * as TypePost from '../constants/post';
import * as actionsPost from '../actions/post';
import {
    getPostAPI, addPostAPI, myPostAPI, likeAPI, deletePostAPI,
    updatePostAPI, countPostAPI, findPostAPI, numberPostAPI
} from '../apis/postAPI';
import { call, put, delay, takeLatest } from 'redux-saga/effects';
import { ShowLoading, HideLoading } from '../actions/ui';
import { uploadImgAPI } from '../apis/uploadImg';
function* watchPost({ payload }) {
    const { param } = payload;
    try {
        const response = yield call(getPostAPI, param);
        const { data, status } = response;
        if (status === 200) {
            yield put(actionsPost.watchPostSuccess(data));
        }
    } catch (e) {
        yield put(actionsPost.postError(e));
    }
}
function* loadMoreActionPost({ payload }) {
    yield delay(1000);
    const { param } = payload;
    try {
        const response = yield call(getPostAPI, param);
        const { status, data } = response;
        if (status === 200) {
            yield put(actionsPost.loadMorePostSuccess(data));
        }
    } catch (e) {
        yield put(actionsPost.postError(e));
    }

}
function* addPost({ payload }) {
    yield put(ShowLoading());
    try {
        const { dataImg, dataForm } = payload;
        const array = [];
        yield* dataImg.map(function* (e) {
            const formData = new FormData();
            formData.append('file', e);
            formData.append("tags", `codeinfuse, medium, gist`);
            formData.append('upload_preset', 'y58ntib0');
            formData.append("timestamp", (Date.now() / 1000) | 0);
            let responseImg = yield call(uploadImgAPI, formData, true);
            const urlImg = responseImg.data.url;
            const statusImg = responseImg.status;
            if (statusImg === 200) {
                array.push(`${urlImg};`);
            }
        });
        const response = yield call(addPostAPI, {
            ...dataForm,
            body: array.join(''),
        });
        const { data, status } = response;
        if (status === 201) {
            yield put(actionsPost.addPostSuccess(data));
        }
    } catch (e) {
        yield put(actionsPost.postError(e));
    }
    yield delay(500);
    yield put(HideLoading());
}
function* updatePost({ payload }) {
    yield put(ShowLoading());
    try {
        const { dataImg, check, post, id } = payload;
        if (check) {
            const array = [];
            yield* dataImg.map(function* (e) {
                const formData = new FormData();
                formData.append('file', e);
                formData.append("tags", `codeinfuse, medium, gist`);
                formData.append('upload_preset', 'y58ntib0');
                formData.append("timestamp", (Date.now() / 1000) | 0);
                let responseImg = yield call(uploadImgAPI, formData, true);
                const urlImg = responseImg.data.url;
                const statusImg = responseImg.status;
                if (statusImg === 200) {
                    array.push(`${urlImg};`);
                }
            });
            const response = yield call(updatePostAPI, id, {
                tittle: post.tittle,
                body: array.join(''),
            });
            const { data, status } = response;
            if (status === 200) {
                yield put(actionsPost.updatePostSuccess(data));
            }
        } else {
            const response = yield call(updatePostAPI, id, {
                tittle: post.tittle,
                body: dataImg
            });
            const { data, status } = response;
            if (status === 200) {
                yield put(actionsPost.updatePostSuccess(data));
            }
        }

    } catch (e) {
        yield put(actionsPost.postError(e));
    }
    yield delay(500);
    yield put(HideLoading());
}
function* like({ payload }) {
    const { param } = payload;
    try {
        yield call(likeAPI, param);
    } catch (e) {
        yield put(actionsPost.postError(e));
    }
}
function* myPost({ payload }) {
    const { id } = payload;
    yield put(ShowLoading());
    try {
        const response = yield call(myPostAPI, id);
        const { data, status } = response;
        if (status === 200) {
            yield put(actionsPost.myPostSuccess(data));
        }
    } catch (e) {
        yield put(actionsPost.postError(e));
    }
    yield delay(500);
    yield put(HideLoading());
}
function* findPost({ payload }) {
    const { id } = payload;
    yield put(ShowLoading());
    try {
        const response = yield call(findPostAPI, id);
        const { data, status } = response;
        if (status === 200) {
            yield put(actionsPost.findPostSuccess(data));
        }
    } catch (e) {
        yield put(actionsPost.postError(e));
    }
    yield delay(500);
    yield put(HideLoading());
}
function* deletePosts({ payload }) {
    yield put(ShowLoading());
    const { arrayIds } = payload;
    try {
        const response = yield call(deletePostAPI, arrayIds);
        const { data, status } = response;
        if (status === 200) {
            yield put(actionsPost.deletedPostsSuccess(data, arrayIds));
        }
    } catch (e) {
        yield put(actionsPost.postError(e));
    }
    yield delay(1000);
    yield put(HideLoading());
}

function* countPost({ payload }) {
    const { month } = payload;
    try {
        const response = yield call(countPostAPI, month);
        const { data, status } = response;
        if (status === 200) {
            yield put(actionsPost.countPostSuccess(data));
        }
    } catch (e) {
        yield put(actionsPost.postError(e));
    }

}
function* numberPost() {
    try {
        const response = yield call(numberPostAPI);
        const { data, status } = response;
        if (status === 200) {
            yield put(actionsPost.numberPostSuccess(data));
        }
    } catch (e) {
        yield put(actionsPost.postError(e));
    }

}
export const posts = [
    takeLatest(TypePost.GET_POST, watchPost),
    takeLatest(TypePost.LOAD_MORE_POST, loadMoreActionPost),
    takeLatest(TypePost.ADD_POST, addPost),
    takeLatest(TypePost.LIKE_POST, like),
    takeLatest(TypePost.MY_POST, myPost),
    takeLatest(TypePost.DELETE_POST, deletePosts),
    takeLatest(TypePost.UPDATE_POST, updatePost),
    takeLatest(TypePost.COUNT_POST, countPost),
    takeLatest(TypePost.FIND_POST, findPost),
    takeLatest(TypePost.NUMBER_POST, numberPost)
];
