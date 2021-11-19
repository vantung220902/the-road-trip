import * as TYPES from '../constants/invitations';
export const watchInvitation = (id) => {
    return {
        type: TYPES.WATCH_INVITATION,
        payload: { id }
    };
}
export const watchInvitationSuccess = (data) => {
    return {
        type: TYPES.WATCH_INVITATION_SUCCESS,
        payload: { data }
    };
}

export const createInvitation = (tickets, users) => {
    return {
        type: TYPES.CREATE_INVITATION,
        payload: { tickets, users }
    };
}
export const createInvitationSuccess = (data) => {
    return {
        type: TYPES.CREATE_INVITATION_SUCCESS,
        payload: { data }
    };
}

export const deleteInvitation = (id) => {
    return {
        type: TYPES.DELETE_INVITATION,
        payload: { id }
    }
}
export const acceptInvitation = (id) => {
    return {
        type: TYPES.ACCEPT_INVITATION,
        payload: { id }
    }
}
export const invitationError = (error) => {
    return {
        type: TYPES.INVITATION_ERROR,
        payload: { error }
    };
}