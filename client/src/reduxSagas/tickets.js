import * as TYPES from '../constants/tickets';
import * as actions from '../actions/tickets';
import { uploadImgAPI } from '../apis/uploadImg';
import { call, put, delay, takeLatest, takeEvery } from 'redux-saga/effects';
import { ShowLoading, HideLoading } from '../actions/ui';
import {
    getListTickets,
    getTicket,
    getFilterTickets,
    creteTicketAPI,
    getTicketSellAPI,
    updateTicketAPI, deletedTicketAPI, deletedForeverTicketAPI
    , getTrashIdAccBuyAPI, restoreTicketAPI, getCountSellAPI,
    getFilterByAuthorAPI, getNumbersAPI, getTicketsApprovalAPI
    , acceptTicketAPI, getAllIdsAPI, getTicketsAdminAPI, getTrashAdminAPI
} from '../apis/ticketsAPI';
function* watchListTaskAction({ payload }) {
    yield put(ShowLoading());
    const { param } = payload;
    //Block//
    try {
        const response = yield call(getListTickets, param);
        const { status, data } = response;
        if (status === 200) {
            yield put(actions.fetchListTicketsSuccess(data));
        }
    } catch (e) {
        yield put(actions.ticketError(e));
    }
    yield delay(1000);
    yield put(HideLoading());
}
function* loadMoreAction({ payload }) {
    yield delay(1000);
    const { param } = payload;
    try {
        const response = yield call(getListTickets, param);
        const { status, data } = response;
        if (status === 200) {
            yield put(actions.loadMoreTicketsSuccess(data));
        }
    } catch (e) {
        yield put(actions.ticketError(e));
    }


}
function* filterTicketsAction({ payload }) {
    yield delay(500);
    const key = payload.param;
    const response = yield call(getFilterTickets, { q: key });
    const { status, data } = response;
    if (status === 200) {
        yield put(actions.filterTicketsSuccess(data));
    }
}
function* filterTicketsByAuthor({ payload }) {
    yield delay(500);
    const key = payload.param;
    const { id } = payload;
    if (key === '' || key === undefined) {
        return yield* getTicketSell({ payload });
    }
    const response = yield call(getFilterByAuthorAPI, id, { q: key });
    const { status, data } = response;
    if (status === 200) {
        yield put(actions.filterTicketsByAuthorSuccess(data));
    }
}
function* findIDTicketAction({ payload }) {
    yield put(ShowLoading());
    const { id } = payload;
    try {
        const response = yield call(getTicket, id);
        const { data, status } = response;
        if (status === 200) {
            yield put(actions.findIDTicketsSuccess(data));
        }
    } catch (e) {
        yield put(actions.ticketError(e));
    }
    yield delay(1000);
    yield put(HideLoading());
}
function* createTicket({ payload }) {
    yield put(ShowLoading());
    try {
        const { dataImg } = payload;
        const responseImg = yield call(uploadImgAPI, dataImg);
        const urlImg = responseImg.data.url;
        const statusImg = responseImg.status;
        if (statusImg === 200) {
            const { dataForm } = payload;
            const response = yield call(creteTicketAPI, {
                ...dataForm,
                image: urlImg,
            });
            const { data, status } = response;
            if (status === 201) {
                yield put(actions.creteTicketSuccess(data));
            }
        }
    } catch (e) {
        yield put(actions.ticketError(e));
    }
    yield delay(1000);
    yield put(HideLoading());
}
function* getTicketSell({ payload }) {
    const { id, params } = payload;
    try {
        const response = yield call(getTicketSellAPI, id, params);
        const { data, status } = response;
        if (status === 200) {
            yield put(actions.watchTicketSellSuccess(data));
        }
    } catch (e) {
        yield put(actions.ticketError(e));
    }

}
function* updateTicket({ payload }) {
    yield put(ShowLoading());
    try {
        const { dataImg, check, ticket, id } = payload;
        if (check) {
            const responseImg = yield call(uploadImgAPI, dataImg);
            const urlImg = responseImg.data.url;
            const statusImg = responseImg.status;
            if (statusImg === 200) {
                const response = yield call(updateTicketAPI, id, {
                    ...ticket,
                    image: urlImg,
                });
                const { data, status } = response;
                if (status === 200) {
                    yield put(actions.updateTicketSuccess(data));
                }
            }
        } else {
            const response = yield call(updateTicketAPI, id, {
                image: dataImg,
                ...ticket,
            });
            const { data, status } = response;
            if (status === 200) {
                yield put(actions.updateTicketSuccess(data));
            }
        }

    } catch (e) {
        yield put(actions.ticketError(e));
    }
    yield delay(500);
    yield put(HideLoading());
}
function* updateTicketAdmin({ payload }) {
    yield put(ShowLoading());
    try {
        const { dataImg, check, ticket, id } = payload;
        if (check) {
            const responseImg = yield call(uploadImgAPI, dataImg);
            const urlImg = responseImg.data.url;
            const statusImg = responseImg.status;
            if (statusImg === 200) {
                const response = yield call(updateTicketAPI, id, {
                    ...ticket,
                    image: urlImg,
                });
                const { data, status } = response;
                if (status === 200) {
                    yield put(actions.updateTicketAdminSuccess(data));
                }
            }
        } else {
            const response = yield call(updateTicketAPI, id, {
                image: dataImg,
                ...ticket,
            });
            const { data, status } = response;
            if (status === 200) {
                yield put(actions.updateTicketAdminSuccess(data));
            }
        }

    } catch (e) {
        yield put(actions.ticketError(e));
    }
    yield delay(500);
    yield put(HideLoading());
}

function* deletedTickets({ payload }) {
    yield put(ShowLoading());
    const { arrayIds } = payload;
    try {
        const response = yield call(deletedTicketAPI, arrayIds);
        const { data, status } = response;
        if (status === 200) {
            yield put(actions.deletedTicketsSuccess(data, arrayIds));
        }
    } catch (e) {
        yield put(actions.ticketError(e));
    }
    yield delay(1000);
    yield put(HideLoading());
}
function* acceptTicket({ payload }) {
    yield put(ShowLoading());
    const { arrayIds } = payload;
    try {
        const response = yield call(acceptTicketAPI, arrayIds);
        const { data, status } = response;
        if (status === 200) {
            yield put(actions.acceptTicketsSuccess(data, arrayIds));
        }
    } catch (e) {
        yield put(actions.ticketError(e));
    }
    yield delay(1000);
    yield put(HideLoading());
}
function* trashTickets({ payload }) {
    yield put(ShowLoading());
    const { id } = payload;
    try {
        const response = yield call(getTrashIdAccBuyAPI, id);
        const { data, status } = response;
        if (status === 200) {
            yield put(actions.trashTicketsSuccess(data));
        }
    } catch (e) {
        yield put(actions.ticketError(e));
    }
    yield delay(1000);
    yield put(HideLoading());
}
function* restoreTickets({ payload }) {
    yield put(ShowLoading());
    const { arrayIds } = payload;
    try {
        const response = yield call(restoreTicketAPI, arrayIds);
        const { data, status } = response;
        if (status === 200) {
            yield put(actions.restoreTrashSuccess(data, arrayIds));
        }
    } catch (e) {
        yield put(actions.ticketError(e));
    }
    yield delay(1000);
    yield put(HideLoading());
}
function* deletedForeverTickets({ payload }) {
    yield put(ShowLoading());
    const { arrayIds } = payload;
    try {
        const response = yield call(deletedForeverTicketAPI, arrayIds);
        const { data, status } = response;
        if (status === 200) {
            yield put(actions.deletedForeverSuccess(data, arrayIds));
        }
    } catch (e) {
        yield put(actions.ticketError(e));
    }
    yield delay(1000);
    yield put(HideLoading());
}
function* countSellTickets({ payload }) {
    yield put(ShowLoading());
    const { id } = payload;
    try {
        const response = yield call(getCountSellAPI, id);
        const { status, data } = response;
        if (status === 200) {
            yield put(actions.getCountSuccess(data.count));
        }

    } catch (e) {
        yield put(actions.ticketError(e));
    }
    yield delay(500);
    yield put(HideLoading());
}
function* getNumbersTickets() {
    try {
        const response = yield call(getNumbersAPI);
        const { status, data } = response;
        if (status === 200) {
            yield put(actions.getNumbersSuccess(data));
        }

    } catch (e) {
        yield put(actions.ticketError(e));
    }
}
function* getTicketsApproval() {
    try {
        const response = yield call(getTicketsApprovalAPI);
        const { status, data } = response;
        if (status === 200) {
            yield put(actions.getTicketsApprovalSuccess(data));
        }

    } catch (e) {
        yield put(actions.ticketError(e));
    }
}
function* getTicketsAdmin() {
    yield put(ShowLoading());
    try {
        const response = yield call(getTicketsAdminAPI);
        const { status, data } = response;
        if (status === 200) {
            yield put(actions.getTicketsAdminSuccess(data));
        }

    } catch (e) {
        yield put(actions.ticketError(e));
    }
    yield delay(500);
    yield put(HideLoading());
}
function* getTrashAdmin() {
    yield put(ShowLoading());
    try {
        const response = yield call(getTrashAdminAPI);
        const { status, data } = response;
        if (status === 200) {
            yield put(actions.trashTicketsSuccess(data));
        }

    } catch (e) {
        yield put(actions.ticketError(e));
    }
    yield delay(500);
    yield put(HideLoading());
}
function* getAllIDs() {
    try {
        const response = yield call(getAllIdsAPI);
        const { data, status } = response;
        if (status === 200) {
            yield put(actions.getALLIdsSuccess(data));
        }
    } catch (e) {
        yield put(actions.ticketError(e));
    }

}
export const ticketSagas = [
    takeLatest(TYPES.GET_TICKETS, watchListTaskAction),
    takeLatest(TYPES.LOAD_MORE, loadMoreAction),
    takeEvery(TYPES.FIND_ID_TICKET, findIDTicketAction),
    takeLatest(TYPES.FILTER_TICKETS, filterTicketsAction),
    takeLatest(TYPES.CREATE_TICKET, createTicket),
    takeLatest(TYPES.WATCH_TICKET_SELL, getTicketSell),
    takeLatest(TYPES.UPDATE_TICKET, updateTicket),
    takeLatest(TYPES.DELETED_TICKETS, deletedTickets),
    takeLatest(TYPES.TRASH_TICKETS, trashTickets),
    takeLatest(TYPES.RESTORE_TRASH_TICKETS, restoreTickets),
    takeLatest(TYPES.DELETED_FOREVER_TICKETS, deletedForeverTickets),
    takeLatest(TYPES.COUNT_SELL_TICKETS, countSellTickets),
    takeLatest(TYPES.FILTER_TICKETS_BY_AUTHOR, filterTicketsByAuthor),
    takeLatest(TYPES.NUMBER_TICKETS, getNumbersTickets),
    takeLatest(TYPES.GET_TICKETS_APPROVAL, getTicketsApproval),
    takeLatest(TYPES.ACCEPT_TICKET, acceptTicket),
    takeLatest(TYPES.GET_ALL_ID, getAllIDs),
    takeLatest(TYPES.GET_TICKETS_ADMIN, getTicketsAdmin),
    takeLatest(TYPES.UPDATE_TICKET_ADMIN, updateTicketAdmin),
    takeLatest(TYPES.TRASH_TICKETS_ADMIN, getTrashAdmin)

]