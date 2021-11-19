import * as TypeEmail from '../constants/email';
import * as actions from '../actions/email';
import { sendEmailAPI } from '../apis/emailAPI';
import { call, put, takeLatest } from 'redux-saga/effects';

function* sendEmail({ payload }) {
    const { array, content } = payload;
    try {
        const response = yield call(sendEmailAPI, { array: array, content: content });
        const { data, status } = response;
        if (status === 200) {
            yield put(actions.sendEmailSuccess(data));
        }
    } catch (e) {
        yield put(actions.sendEmailError(e));
    }
}

export const emails = [
    takeLatest(TypeEmail.SEND_EMAIL, sendEmail),

];
