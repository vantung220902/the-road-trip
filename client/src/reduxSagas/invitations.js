import * as TYPES from '../constants/invitations';
import * as actions from '../actions/invitationActions';
import {
    watchInvitationAPI, deleteInvitationAPI,
    acceptInvitationAPI, createInvitationAPI
} from '../apis/invitationsAPI';
import { call, put, delay, takeLatest } from 'redux-saga/effects';
import { ShowLoading, HideLoading } from '../actions/ui';
function* watchInvitation({ payload }) {
    yield put(ShowLoading());
    const { id } = payload;
    try {
        const response = yield call(watchInvitationAPI, id);
        const { data, status } = response;
        if (status === 200) {
            yield put(actions.watchInvitationSuccess(data));
        }
    } catch (e) {
        yield put(actions.invitationError(e));
    }
    yield delay(1000);
    yield put(HideLoading());
}
function* deleteInvitation({ payload }) {
    const { id } = payload;
    try {
        yield call(deleteInvitationAPI, id);
    } catch (e) {
        yield put(actions.invitationError(e));
    }
}
function* acceptInvitation({ payload }) {
    const { id } = payload;
    try {
        yield call(acceptInvitationAPI, id);
    } catch (e) {
        yield put(actions.invitationError(e));
    }
}
function* createInvitation({ payload }) {
    yield put(ShowLoading());
    const { tickets, users } = payload;
    try {
        const response = yield call(createInvitationAPI, {
            tickets: [...tickets],
            users: [...users]
         });
        const { data, status } = response;
        if (status === 201) {
            yield put(actions.createInvitationSuccess(data));
        }
    } catch (e) {
        yield put(actions.invitationError(e));
    }
    yield delay(1000);
    yield put(HideLoading());
}
export const invitations = [
    takeLatest(TYPES.WATCH_INVITATION, watchInvitation),
    takeLatest(TYPES.DELETE_INVITATION, deleteInvitation),
    takeLatest(TYPES.ACCEPT_INVITATION, acceptInvitation),
    takeLatest(TYPES.CREATE_INVITATION, createInvitation),
]