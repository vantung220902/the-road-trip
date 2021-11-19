import * as types from '../constants/tickets';
export const fetchListTickets = (param = {}) => {
    return {
        type: types.GET_TICKETS,
        payload: { param },
    };
};
export const fetchListTicketsSuccess = (data) => {
    return {
        type: types.GET_TICKETS_SUCCESS,
        payload: { data },
    };
};
export const getTicketsApproval = () => {
    return {
        type: types.GET_TICKETS_APPROVAL,
    };
};
export const getTicketsApprovalSuccess = (data) => {
    return {
        type: types.GET_TICKETS_APPROVAL_SUCCESS,
        payload: { data },
    };
};

export const getTicketsAdmin = () => {
    return {
        type: types.GET_TICKETS_ADMIN,
    };
};
export const getTicketsAdminSuccess = (data) => {
    return {
        type: types.GET_TICKETS_ADMIN_SUCCESS,
        payload: { data },
    };
};


export const loadMoreTickets = (param = {}) => {
    return {
        type: types.LOAD_MORE,
        payload: { param },
    };
};
export const loadMoreTicketsSuccess = (data) => {
    return {
        type: types.LOAD_MORE_SUCCESS,
        payload: { data },
    };
};

export const findIDTickets = (id) => {
    return {
        type: types.FIND_ID_TICKET,
        payload: { id },
    };
};
export const findIDTicketsSuccess = (data) => {
    return {
        type: types.FIND_ID_TICKET_SUCCESS,
        payload: { data },
    };
};
export const getALLIds = () => {
    return {
        type: types.GET_ALL_ID,
    };
};
export const getALLIdsSuccess = (data) => {
    return {
        type: types.GET_ALL_ID_SUCCESS,
        payload: { data },
    };
};
export const filterTickets = (param = {}) => {
    return {
        type: types.FILTER_TICKETS,
        payload: { param },
    };
};
export const filterTicketsSuccess = (data) => {
    return {
        type: types.FILTER_TICKETS_SUCCESS,
        payload: { data },
    };
};
export const filterTicketsByAuthor = (id, param = {}) => {
    return {
        type: types.FILTER_TICKETS_BY_AUTHOR,
        payload: { id, param },
    };
};
export const filterTicketsByAuthorSuccess = (data) => {
    return {
        type: types.FILTER_TICKETS_BY_AUTHOR_SUCCESS,
        payload: { data },
    };
};
export const creteTicket = (dataImg, dataForm) => {
    return {
        type: types.CREATE_TICKET,
        payload: { dataImg, dataForm },
    };
};
export const creteTicketSuccess = (data) => {
    return {
        type: types.CREATE_TICKET_SUCCESS,
        payload: { data },
    };
};

export const watchTicketSellSuccess = (data) => {
    return {
        type: types.WATCH_TICKET_SELL_SUCCESS,
        payload: { data },
    };
};
export const watchTicketSell = (id, params = {}) => {
    return {
        type: types.WATCH_TICKET_SELL,
        payload: { id, params },
    };
};

export const updateTicketSuccess = (data) => {
    return {
        type: types.UPDATE_TICKET_SUCCESS,
        payload: { data },
    };
};
export const updateTicket = (id, dataImg, ticket, check) => {
    return {
        type: types.UPDATE_TICKET,
        payload: { id, dataImg, ticket, check },
    };
};
export const updateTicketAdmin = (id, dataImg, ticket, check) => {
    return {
        type: types.UPDATE_TICKET_ADMIN,
        payload: { id, dataImg, ticket, check },
    };
};

export const updateTicketAdminSuccess = (data) => {
    return {
        type: types.UPDATE_TICKET_ADMIN_SUCCESS,
        payload: { data },
    };
};

export const deletedTickets = (arrayIds) => {
    return {
        type: types.DELETED_TICKETS,
        payload: { arrayIds }
    }
}
export const deletedTicketsSuccess = (data, arrayIds) => {
    return {
        type: types.DELETED_TICKETS_SUCCESS,
        payload: { data, arrayIds }
    }
}
export const trashTickets = (id) => {
    return {
        type: types.TRASH_TICKETS,
        payload: { id }
    }
}
export const trashTicketsSuccess = (data) => {
    return {
        type: types.TRASH_TICKETS_SUCCESS,
        payload: { data }
    }
}
export const trashTicketsAdmin = () => {
    return {
        type: types.TRASH_TICKETS_ADMIN,
    }
}

export const deletedForeverTicket = (arrayIds) => {
    return {
        type: types.DELETED_FOREVER_TICKETS,
        payload: { arrayIds }
    }
}
export const deletedForeverSuccess = (data, arrayIds) => {
    return {
        type: types.DELETED_FOREVER_TICKETS_SUCCESS,
        payload: { data, arrayIds }
    }
}
export const restoreTrashTickets = (arrayIds) => {
    return {
        type: types.RESTORE_TRASH_TICKETS,
        payload: { arrayIds }
    }
}
export const restoreTrashSuccess = (data, arrayIds) => {
    return {
        type: types.RESTORE_TRASH_TICKETS_SUCCESS,
        payload: { data, arrayIds }
    }
}

export const getCountSell = (id) => {
    return {
        type: types.COUNT_SELL_TICKETS,
        payload: { id }
    }
}
export const getCountSuccess = (data) => {
    return {
        type: types.COUNT_SELL_TICKETS_SUCCESS,
        payload: { data }
    }
}

export const getNumbers = () => {
    return {
        type: types.NUMBER_TICKETS,
    }
}
export const getNumbersSuccess = (data) => {
    return {
        type: types.NUMBER_TICKETS_SUCCESS,
        payload: { data }
    }
}
export const ticketError = (error) => {
    return {
        type: types.ERROR,
        payload: { error }
    }
}
export const acceptTickets = (arrayIds) => {
    return {
        type: types.ACCEPT_TICKET,
        payload: { arrayIds }
    }
}
export const acceptTicketsSuccess = (data, arrayIds) => {
    return {
        type: types.ACCEPT_TICKET_SUCCESS,
        payload: { data, arrayIds }
    }
}