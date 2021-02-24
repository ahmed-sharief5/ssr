import UserActions, { userActionTypes } from '../actions/userActions';
import { put, takeLatest, all } from 'redux-saga/effects';
import UserService from '../services/userServices';


function* _getUserProfile(action) {
    try {
        yield put(UserActions.getUserProfileLoading(true));
        const userProfile = yield UserService.getUserProfile();
        yield put(UserActions.setUserProfile(userProfile))
        yield put(UserActions.getUserProfileLoading(false));
    } catch (error) {
        yield put(UserActions.getUserProfileLoading(false));
    }
}

function* getUserProfile() {
    yield takeLatest(userActionTypes.GET_USER_PROFILE, _getUserProfile);
}

export default function* userSaga() {
    yield all([getUserProfile()]);
}
