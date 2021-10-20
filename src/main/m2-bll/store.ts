import { createStore, applyMiddleware , combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {all} from 'redux-saga/effects';
import {loginReducer} from "../../features/f1-login/l2-bll/login-reducer";
import {hotelsWatcherSaga} from "../../features/f2-hotel-search/h2-bll/hotelSearch-sagas";


const rootReducer = combineReducers({
    login: loginReducer
});

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootWatcher)

function* rootWatcher() {
    yield all([hotelsWatcherSaga()])
}

// types
export type AppStateType = ReturnType<typeof rootReducer>;
export type InferActionsType<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

//@ts-ignore
window.store = store
