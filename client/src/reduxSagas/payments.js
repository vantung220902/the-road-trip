import * as TypesPay from './../constants/payment';
import * as actionsPay from './../actions/payments';
import {
    paymentsAPI,
    getIdAccBuyAPI,
    deletedPaymentAPI,
    getTrashIdAccBuyAPI,
    restorePaymentAPI,
    deletedForeverPaymentAPI,
    getCountBuyAPI, searchesAPI,
    revenueAPI, lastsPaymentAPI,
    transactionPaymentAPI, getPaymentIdAPI,
    updatePaymentAPI, getTrashAPI
} from '../apis/paymentsAPI';
import { ShowLoading, HideLoading } from '../actions/ui';
import { call, put, delay, takeLatest } from 'redux-saga/effects';

function* paymentsTicket({ payload }) {
    yield put(ShowLoading());
    const { value } = payload;
    try {
        const response = yield call(paymentsAPI, value);
        const { data, status } = response;
        if (status === 201) {
            yield put(actionsPay.paymentsSuccess(data));
        }
    } catch (e) {
        yield put(actionsPay.paymentsError(e));
    }
    yield delay(1000);
    yield put(HideLoading());
}
function* watchIDAccBuy({ payload }) {

    const { id, params } = payload;
    try {
        const response = yield call(getIdAccBuyAPI, id, params);
        const { data, status } = response;
        if (status === 200) {
            yield put(actionsPay.findIDAccPaymentSuccess(data));
        }
    } catch (e) {
        yield put(actionsPay.paymentsError(e));
    }
}
function* deletedPayments({ payload }) {
    yield put(ShowLoading());
    const { arrayIds } = payload;
    try {
        const response = yield call(deletedPaymentAPI, arrayIds);
        const { data, status } = response;
        if (status === 200) {
            yield put(actionsPay.deletedPaymentSuccess(data, arrayIds));
        }
    } catch (e) {
        yield put(actionsPay.paymentsError(e));
    }
    yield delay(1000);
    yield put(HideLoading());
}
function* trashPayment({ payload }) {
    yield put(ShowLoading());
    const { id } = payload;
    try {
        const response = yield call(getTrashIdAccBuyAPI, id);
        const { data, status } = response;
        if (status === 200) {
            yield put(actionsPay.trashPaymentSuccess(data));
        }
    } catch (e) {
        yield put(actionsPay.paymentsError(e));
    }
    yield delay(1000);
    yield put(HideLoading());
}
function* restorePayment({ payload }) {
    yield put(ShowLoading());
    const { arrayIds } = payload;
    try {
        const response = yield call(restorePaymentAPI, arrayIds);
        const { data, status } = response;
        if (status === 200) {
            yield put(actionsPay.restoreTrashSuccess(data, arrayIds));
        }
    } catch (e) {
        yield put(actionsPay.paymentsError(e));
    }
    yield delay(1000);
    yield put(HideLoading());
}
function* deletedForeverPayment({ payload }) {
    yield put(ShowLoading());
    const { arrayIds } = payload;
    try {
        const response = yield call(deletedForeverPaymentAPI, arrayIds);
        const { data, status } = response;
        if (status === 200) {
            yield put(actionsPay.deletedForeverSuccess(data, arrayIds));
        }
    } catch (e) {
        yield put(actionsPay.paymentsError(e));
    }
    yield delay(1000);
    yield put(HideLoading());
}
function* countBuy({ payload }) {
    yield put(ShowLoading());
    const { id } = payload;
    try {
        const response = yield call(getCountBuyAPI, id);
        const { status, data } = response;
        if (status === 200) {
            yield put(actionsPay.getCountSuccess(data.count));
        }

    } catch (e) {
        yield put(actionsPay.paymentsError(e));
    }
    yield delay(500);
    yield put(HideLoading());
}
function* search({ payload }) {
    yield delay(500);
    const key = payload.param;
    const { id } = payload;
    if (key === '' || key === undefined) {
        return yield* watchIDAccBuy({ payload });
    }
    const response = yield call(searchesAPI, id, { q: key });
    const { status, data } = response;
    if (status === 200) {
        yield put(actionsPay.searchSuccess(data));
    }
}
function* revenuePayment() {
    try {
        const response = yield call(revenueAPI);
        const { data, status } = response;
        if (status === 200) {
            yield put(actionsPay.revenuePaymentSuccess(data));
        }
    } catch (e) {
        yield put(actionsPay.paymentsError(e));
    }
}
function* lastsPayments() {
    yield put(ShowLoading());
    try {
        const response = yield call(lastsPaymentAPI);
        const { data, status } = response;
        if (status === 200) {
            yield put(actionsPay.LastsPaymentSuccess(data));
        }
    } catch (e) {
        yield put(actionsPay.paymentsError(e));
    }
    yield delay(500);
    yield put(HideLoading());
}

function* transactionPayments() {
    yield put(ShowLoading());
    try {
        const response = yield call(transactionPaymentAPI);
        const { data, status } = response;
        if (status === 200) {
            yield put(actionsPay.transactionSuccess(data));
        }
    } catch (e) {
        yield put(actionsPay.paymentsError(e));
    }
    yield delay(500);
    yield put(HideLoading());
}
function* findPayment({ payload }) {
    yield put(ShowLoading());
    const { id } = payload;
    try {
        const response = yield call(getPaymentIdAPI, id);
        const { data, status } = response;
        if (status === 200) {
            yield put(actionsPay.findPaymentIDSuccess(data));
        }
    } catch (e) {
        yield put(actionsPay.paymentsError(e));
    }
    yield delay(500);
    yield put(HideLoading());
}
function* updatePayment({ payload }) {
    yield put(ShowLoading());
    const { payment } = payload;
    try {
        const response = yield call(updatePaymentAPI, payment);
        const { data, status } = response;
        if (status === 200) {
            yield put(actionsPay.updatePaymentSuccess(data));
        }
    } catch (e) {
        yield put(actionsPay.paymentsError(e));
    }
    yield delay(1000);
    yield put(HideLoading());
}
function* trashPaymentAdmin() {
    yield put(ShowLoading());
    try {
        const response = yield call(getTrashAPI);
        const { data, status } = response;
        if (status === 200) {
            yield put(actionsPay.trashPaymentAdminSuccess(data));
        }
    } catch (e) {
        yield put(actionsPay.paymentsError(e));
    }
    yield delay(1000);
    yield put(HideLoading());
}
export const payments = [
    takeLatest(TypesPay.PAYMENTS, paymentsTicket),
    takeLatest(TypesPay.WATCH_ID_ACC_BUY, watchIDAccBuy),
    takeLatest(TypesPay.DELETED_PAYMENT, deletedPayments),
    takeLatest(TypesPay.TRASH_PAYMENT, trashPayment),
    takeLatest(TypesPay.RESTORE_TRASH_PAYMENT, restorePayment),
    takeLatest(TypesPay.DELETED_FOREVER_PAYMENT, deletedForeverPayment),
    takeLatest(TypesPay.COUNT_BUY, countBuy),
    takeLatest(TypesPay.SEARCH_TICKET_BUY, search),
    takeLatest(TypesPay.REVENUE_PAYMENT, revenuePayment),
    takeLatest(TypesPay.LASTS_PAYMENTS, lastsPayments),
    takeLatest(TypesPay.TRANSACTION_PAYMENT, transactionPayments),
    takeLatest(TypesPay.FIND_PAYMENT, findPayment),
    takeLatest(TypesPay.UPDATE_PAYMENT, updatePayment),
    takeLatest(TypesPay.TRASH_PAYMENT_ADMIN, trashPaymentAdmin)
]