import * as TYPES from '../constants/invitations';
import { toast } from 'react-toastify';
const init = {
    listInvitations: [],
    checked: false,
}
const reducer = (state = init, action) => {
    let data = null;
    switch (action.type) {
        case TYPES.WATCH_INVITATION:
            return { ...state }
        case TYPES.WATCH_INVITATION_SUCCESS:
            data = action.payload.data;
            return {
                ...state,
                listInvitations: data
            }
        case TYPES.DELETE_INVITATION:
            const listInvitations = state.listInvitations;
            const { id } = action.payload;
            const index = listInvitations.findIndex((e) => e.id === id);
            if (index !== -1) {
                const newInvitation = [
                    ...listInvitations.slice(0, index),
                    ...listInvitations.slice(index + 1)
                ];
                return {
                    ...state,
                    listInvitations: newInvitation
                }
            }
            return {
                ...state,
            }
        case TYPES.CREATE_INVITATION:
            return { ...state }
        case TYPES.CREATE_INVITATION_SUCCESS:
            data = action.payload.data;
            toast.success('Send Invitation Successfully 😀');
            return {
                ...state,
                checked: data.checked,
            }

        case TYPES.ACCEPT_INVITATION:
            return { ...state }
        case TYPES.INVITATION_ERROR:
            const { error } = action.payload;
            console.log(error);
            return {
                ...state,
            }
        default: return state;
    }
};
export default reducer;