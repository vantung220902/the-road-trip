import * as TypeFriends from '../constants/friends';
import * as actionFriends from '../actions/friends';
import {
    checkFriendsAPI, requestFriendsAPI, getRequestFriendsAPI,
    acceptRequestAPI, declineRequestAPI, removeFriendAPI, getFriendsAPI
} from '../apis/friendsAPI';
import { call, put, takeLatest } from 'redux-saga/effects';

function* checkFriends({ payload }) {
    const { id } = payload;
    try {
        const response = yield call(checkFriendsAPI, id);
        const { data, status } = response;
        if (status === 200) {
            yield put(actionFriends.checkFriendsSuccess(data));
        }
    } catch (e) {
        yield put(actionFriends.friendError(e));
    }
}
function* requestFriends({ payload }) {
    const { id } = payload;
    try {
        const response = yield call(requestFriendsAPI, id);
        const { data, status } = response;
        if (status === 201) {
            yield put(actionFriends.requestFriendsSuccess(data));
        }
    } catch (e) {
        yield put(actionFriends.friendError(e));
    }
}
function* getRequestFriends({ payload }) {
    const { id } = payload;
    try {
        const response = yield call(getRequestFriendsAPI, id);
        const { data, status } = response;
        if (status === 200) {
            yield put(actionFriends.getRequestFriendsSuccess(data));
        }
    } catch (e) {
        yield put(actionFriends.friendError(e));
    }
}

function* getFriends({ payload }) {
    const { id } = payload;
    try {
        const response = yield call(getFriendsAPI, id);
        const { data, status } = response;
        if (status === 200) {
            yield put(actionFriends.getFriendsSuccess(data));
        }
    } catch (e) {
        yield put(actionFriends.friendError(e));
    }
}
function* acceptRequest({ payload }) {
    const { id } = payload;
    try {
        const response = yield call(acceptRequestAPI, id);
        const { data, status } = response;
        if (status === 200) {
            yield put(actionFriends.checkFriendsSuccess(data));
        }
    } catch (e) {
        yield put(actionFriends.friendError(e));
    }
}

function* declineRequest({ payload }) {
    const { id } = payload;
    try {
        const response = yield call(declineRequestAPI, id);
        const { data, status } = response;
        if (status === 200) {
            yield put(actionFriends.checkFriendsSuccess(data));
        }
    } catch (e) {
        yield put(actionFriends.friendError(e));
    }
}
function* removeFriend({ payload }) {
    const { id } = payload;
    try {
        const response = yield call(removeFriendAPI, { id });
        const { data, status } = response;
        if (status === 200) {
            yield put(actionFriends.checkFriendsSuccess(data));
        }
    } catch (e) {
        yield put(actionFriends.friendError(e));
    }
}
export const friends = [
    takeLatest(TypeFriends.CHECK_FRIEND, checkFriends),
    takeLatest(TypeFriends.ADD_FRIEND, requestFriends),
    takeLatest(TypeFriends.LIST_REQUEST_FRIEND, getRequestFriends),
    takeLatest(TypeFriends.ACCEPT_FRIEND, acceptRequest),
    takeLatest(TypeFriends.DECLINE_FRIEND, declineRequest),
    takeLatest(TypeFriends.REMOVE_FRIEND, removeFriend),
    takeLatest(TypeFriends.LIST_FRIEND, getFriends),
];
