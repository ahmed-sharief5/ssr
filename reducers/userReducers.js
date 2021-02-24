import { userActionTypes } from '../actions/userActions';

/**
 *
 * @param state
 * @param action
 * @returns {{getUserProfileLoading: *}|{user: *}|UserReducer.props|{}}
 * @constructor
 */
const UserReducer = (state = { }, action) => {
    switch (action.type) {
        case `${userActionTypes.GET_USER_PROFILE}_LOADING`: {
            const { getUserProfileLoading } = action;
            return {
                ...state,
                getUserProfileLoading
            };
        }
        case `${userActionTypes.GET_USER_PROFILE}_SUCCESS`: {
            const { user } = action;
            return {
                ...state,
                user,
            };
        }
        default: {
            return state;
        }
    }
};

export default UserReducer;
