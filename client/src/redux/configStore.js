import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers/index';
import createSagaMiddleware from 'redux-saga';
import mySaga from '../reduxSagas/index';
const composeEnhancers =
    (typeof window !== 'undefined' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
const sagaMiddleware = createSagaMiddleware();
const configStore = () => {
    const middleware = [sagaMiddleware];
    const enhancers = [applyMiddleware(...middleware)];
    const store = createStore(rootReducer, composeEnhancers(...enhancers));
    sagaMiddleware.run(mySaga);
    return store;
};

export default configStore;
