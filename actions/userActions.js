export const userActionTypes = {
    GET_USER_PROFILE: 'GET_USER_PROFILE',
};

/**
 *
 */
class UserActions{

    /**
     *
     * @returns {{type: string}}
     */
    getUserProfile(userId) {
        return {
            type: userActionTypes.GET_USER_PROFILE,
        };
    }

    /**
     *
     * @param getUserProfileLoading
     * @returns {{getUserProfileLoading: *, type: string}}
     */
    getUserProfileLoading(getUserProfileLoading) {
        return {
            type: `${userActionTypes.GET_USER_PROFILE}_LOADING`,
            getUserProfileLoading,
        };
    }

    /**
     *
     * @param userProfile
     * @returns {{type: string, userProfile: *}}
     */
    setUserProfile(userProfile) {
        return {
            type: `${userActionTypes.GET_USER_PROFILE}_SUCCESS`,
            userProfile,
        }
    }
}

export default new UserActions();
