import * as TypeEmail from '../constants/email';
import * as actions from '../actions/email';
import { sendEmailAPI } from '../apis/emailAPI';
import { call, put, takeLatest,delay } from 'redux-saga/effects';
import { ShowLoading, HideLoading } from '../actions/ui';
import { uploadImgAPI } from '../apis/uploadImg';

function* sendEmail({ payload }) {
    yield put(ShowLoading());
    try {
        const { array, content, dataImg } = payload;
        const arrayImg = [];
        yield* dataImg.map(function* (e) {
            const formData = new FormData();
            formData.append('file', e);
            formData.append("tags", `codeinfuse, medium, gist`);
            formData.append('upload_preset', 'y58ntib0');
            formData.append("timestamp", (Date.now() / 1000) | 0);
            let responseImg = yield call(uploadImgAPI, formData, true);
            console.log(responseImg);
            const urlImg = responseImg.data.url;
            const statusImg = responseImg.status;
            if (statusImg === 200) {
                arrayImg.push({ path: urlImg });
            }
        });
        yield delay(2000);
        const response = yield call(sendEmailAPI, { array: array, content: content, arrayImg: arrayImg });
        const { data, status } = response;
        if (status === 200) {
            yield put(actions.sendEmailSuccess(data));
           
        }
    } catch (e) {
        yield put(actions.sendEmailError(e));
    }
    yield put(HideLoading());
}
export const emails = [
    takeLatest(TypeEmail.SEND_EMAIL, sendEmail),

];
