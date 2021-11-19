import { combineReducers } from 'redux';
import tickets from './tickets';
import ui from './ui';
import sign from './sign';
import payments from './payments';
import modal from './model';
import stories from './stories';
import invitations from './invitation';
import post from './post';
import comment from './comment';
import friends from './friends';
import message from './message';
import email from './email';
import { reducer as formReducer } from 'redux-form';
const rootReducer = combineReducers({
    tickets,
    ui,
    sign,
    payments,
    modal,
    stories,
    invitations,
    post,
    comment,
    friends,
    message,
    email,
    form: formReducer,
});
export default rootReducer;
