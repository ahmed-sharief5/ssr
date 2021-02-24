import { routerActionTypes } from '../actions/routerActions';
import {takeLatest, all, fork} from 'redux-saga/effects';
import { history } from '../services'


function* _navigate(action) {
    const { pathname } = action;
    if(pathname){
        yield history.push(pathname)
    }

}

function* navigate() {
    yield takeLatest(routerActionTypes.UPDATE_ROUTER_STATE, _navigate);
}


export default function* routerSaga() {
    yield all([
        fork(navigate)
    ])
}
