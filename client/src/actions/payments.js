import * as TYPES from '../constants/payment';
export const payments = (value) => {
    return {
        type: TYPES.PAYMENTS,
        payload: { value },
    };
};
export const paymentsSuccess = (data) => {
    return {
        type: TYPES.PAYMENTS_SUCCESS,
        payload: { data },
    };
};

export const watchTicketBuySuccess = (data) => {
    return {
        type: TYPES.WATCH_TICKET_BUY_SUCCESS,
        payload: { data },
    };
};
export const watchTicketBuy = () => {
    return {
        type: TYPES.WATCH_TICKET_BUY,
    };
};

export const transactions = () => {
    return {
        type: TYPES.TRANSACTION_PAYMENT,
    };
};

export const transactionSuccess = (data) => {
    return {
        type: TYPES.TRANSACTION_PAYMENT_SUCCESS,
        payload: { data },
    };
};

export const findIDAccPayment = (id, params = {}) => {
    return {
        type: TYPES.WATCH_ID_ACC_BUY,
        payload: { id, params },
    };
};
export const findIDAccPaymentSuccess = (data) => {
    return {
        type: TYPES.WATCH_ID_ACC_BUY_SUCCESS,
        payload: { data },
    };
};
export const findPaymentID = (id) => {
    return {
        type: TYPES.FIND_PAYMENT,
        payload: { id },
    };
};
export const findPaymentIDSuccess = (data) => {
    return {
        type: TYPES.FIND_PAYMENT_SUCCESS,
        payload: { data },
    };
};
export const updatePayment = (payment) => {
    return {
        type: TYPES.UPDATE_PAYMENT,
        payload: { payment }
    };
};
export const updatePaymentSuccess = () => {
    return {
        type: TYPES.UPDATE_PAYMENT_SUCCESS,
    };
};


export const deletedPayment = (arrayIds) => {
    return {
        type: TYPES.DELETED_PAYMENT,
        payload: { arrayIds }
    }
}
export const deletedPaymentSuccess = (data, arrayIds) => {
    return {
        type: TYPES.DELETED_PAYMENT_SUCCESS,
        payload: { data, arrayIds }
    }
}
export const trashPayment = (id) => {
    return {
        type: TYPES.TRASH_PAYMENT,
        payload: { id }
    }
}
export const trashPaymentSuccess = (data) => {
    return {
        type: TYPES.TRASH_PAYMENT_SUCCESS,
        payload: { data }
    }
}
export const trashPaymentAdmin = () => {
    return {
        type: TYPES.TRASH_PAYMENT_ADMIN,
    }
}
export const trashPaymentAdminSuccess = (data) => {
    return {
        type: TYPES.TRASH_PAYMENT_ADMIN_SUCCESS,
        payload: { data }
    }
}

export const deletedForever = (arrayIds) => {
    return {
        type: TYPES.DELETED_FOREVER_PAYMENT,
        payload: { arrayIds }
    }
}
export const deletedForeverSuccess = (data, arrayIds) => {
    return {
        type: TYPES.DELETED_FOREVER_PAYMENT_SUCCESS,
        payload: { data, arrayIds }
    }
}
export const restoreTrash = (arrayIds) => {
    return {
        type: TYPES.RESTORE_TRASH_PAYMENT,
        payload: { arrayIds }
    }
}
export const restoreTrashSuccess = (data, arrayIds) => {
    return {
        type: TYPES.RESTORE_TRASH_PAYMENT_SUCCESS,
        payload: { data, arrayIds }
    }
}

export const getCountBuy = (id) => {
    return {
        type: TYPES.COUNT_BUY,
        payload: { id }
    }
}
export const getCountSuccess = (data) => {
    return {
        type: TYPES.COUNT_BUY_SUCCESS,
        payload: { data }
    }
}
export const search = (id, param = {}) => {
    return {
        type: TYPES.SEARCH_TICKET_BUY,
        payload: { id, param },
    };
};
export const searchSuccess = (data) => {
    return {
        type: TYPES.SEARCH_TICKET_BUY_SUCCESS,
        payload: { data },
    };
};
export const revenuePayment = () => {
    return {
        type: TYPES.REVENUE_PAYMENT,
        payload: {}
    }
}
export const revenuePaymentSuccess = (data) => {
    return {
        type: TYPES.REVENUE_PAYMENT_SUCCESS,
        payload: { data }
    }
}
export const LastsPayment = () => {
    return {
        type: TYPES.LASTS_PAYMENTS,
    };
};
export const LastsPaymentSuccess = (data) => {
    return {
        type: TYPES.LASTS_PAYMENTS_SUCCESS,
        payload: { data },
    };
};
export const paymentsError = (error) => {
    return {
        type: TYPES.ERROR,
        payload: { error }
    }
}
