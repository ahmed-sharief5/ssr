import { all } from 'redux-saga/effects';
import usersSaga from './usersSaga';
import routerSaga from './routerSaga';

export default function* rootSaga() {
    yield all([
        usersSaga(),
        routerSaga(),
    ]);
}
