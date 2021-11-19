import { ticketSagas } from './tickets';
import { signSagas } from './signs';
import { payments } from './payments';
import { stories } from './stories';
import { invitations } from './invitations';
import { posts } from './post';
import { comments } from './comment';
import { friends } from './friends';
import { message } from './message';
import { emails} from './emai';
import { all } from '@redux-saga/core/effects';

function* rootSaga() {
    yield all([
        ...ticketSagas,
        ...signSagas,
        ...payments,
        ...stories,
        ...invitations,
        ...posts,
        ...comments,
        ...friends,
        ...message,
        ...emails,
    ])
}
export default rootSaga;
