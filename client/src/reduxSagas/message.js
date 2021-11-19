import * as TypeMessage from '../constants/message';
import * as actions from '../actions/message';
import { getMessageAPI, createMessageAPI, deleteMessageAPI } from '../apis/messageAPI';
import { call, put, takeLatest } from 'redux-saga/effects';

function* watchMessage({ payload }) {
    const { id } = payload;
    try {
        const response = yield call(getMessageAPI, id);
        const { data, status } = response;
        if (status === 200) {
            yield put(actions.watchMessageSuccess(data));
        }
    } catch (e) {
        yield put(actions.messageError(e));
    }
}
function* createMessage({ payload }) {
    const { message } = payload;
    try {
        const response = yield call(createMessageAPI, message);
        const { data, status } = response;
        if (status === 201) {
            yield put(actions.addMessageSuccess(data));

        }
    } catch (e) {
        yield put(actions.messageError(e));
    }
}
function* deleteMessage({ payload }) {
    const { id } = payload;
    try {
        const response = yield call(deleteMessageAPI, id);
        const { data, status } = response;
        if (status === 200) {
            yield put(actions.deleteMessageSuccess(data));
        }
    } catch (e) {
        yield put(actions.messageError(e));
    }
}
export const message = [
    takeLatest(TypeMessage.GET_MESSAGE, watchMessage),
    takeLatest(TypeMessage.ADD_MESSAGE, createMessage),
    takeLatest(TypeMessage.DELETE_MESSAGE, deleteMessage)
];
