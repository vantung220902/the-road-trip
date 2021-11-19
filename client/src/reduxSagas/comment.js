import * as TypeComment from '../constants/comment';
import * as actions from '../actions/comment';
import { getCommentAPI, createCommentAPI, deleteCommentAPI } from '../apis/commentAPI';
import { call, put, takeLatest } from 'redux-saga/effects';

function* watchComment({ payload }) {
    const { id } = payload;
    try {
        const response = yield call(getCommentAPI, id);
        const { data, status } = response;
        if (status === 200) {
            yield put(actions.watchCommentSuccess(data));
        }
    } catch (e) {
        yield put(actions.commentError(e));
    }
}
function* create({ payload }) {
    const { comment } = payload;
    try {
        const response = yield call(createCommentAPI, comment);
        const { data, status } = response;
        if (status === 201) {
            yield put(actions.addCommentSuccess(data));

        }
    } catch (e) {
        yield put(actions.commentError(e));
    }
}
function* deleteComment({ payload }) {
    const { id } = payload;
    try {
        const response = yield call(deleteCommentAPI, id);
        const { data, status } = response;
        if (status === 200) {
            yield put(actions.deleteCommentSuccess(data));
        }
    } catch (e) {
        yield put(actions.commentError(e));
    }
}
export const comments = [
    takeLatest(TypeComment.GET_COMMENT, watchComment),
    takeLatest(TypeComment.ADD_COMMENT, create),
    takeLatest(TypeComment.DELETE_COMMENT, deleteComment)
];
