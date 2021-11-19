import * as TYPES from '../constants/stories';
import * as actions from '../actions/stories';
import { getStoriesAPI, addStoriesAPI, removeStoriesAPI } from '../apis/storiesAPI';
import { call, put, delay, takeLatest } from 'redux-saga/effects';
import { ShowLoading, HideLoading } from '../actions/ui';

function* watchStories() {
    yield put(ShowLoading());
    try {
        const response = yield call(getStoriesAPI);
        const { data, status } = response;
        if (status === 200) {
            yield put(actions.watchStoriesSuccess(data));
        }
    } catch (e) {
        yield put(actions.storiesError(e));
    }
    yield delay(1000);
    yield put(HideLoading());
}
function* addStories({ payload }) {
    yield put(ShowLoading());
    try {
        const { dataForm, dataImg } = payload;
        const response = yield call(addStoriesAPI, {
            ...dataForm,
            image: dataImg,
        });
        const { data, status } = response;
        if (status === 201) {
            yield put(actions.addStoriesSuccess(data));
        }
    } catch (e) {
        yield put(actions.storiesError(e));
    }
    yield delay(500);
    yield put(HideLoading());
}
function* deleteStories({ payload }) {
    const { id } = payload;
    console.log(id);
    try {
        const response = yield call(removeStoriesAPI, id);
        const { data, status } = response;
        if (status === 200) {
            yield put(actions.deleteStoriesSuccess(data));
        }
    } catch (e) {
        yield put(actions.storiesError(e));
    }
}
export const stories = [
    takeLatest(TYPES.GET_STORIES, watchStories),
    takeLatest(TYPES.ADD_STORIES, addStories),
    takeLatest(TYPES.DELETE_STORIES, deleteStories),
];
