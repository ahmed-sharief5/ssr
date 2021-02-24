import Constants from '../network/constants';
import Helpers from '../network/helpers';

/**
 * UserServices
 *
 * @param username
 * @param password
 */
class UserServices {
    /**
     *
     * @return {Promise<unknown>}
     */
    getUserProfile = async () => {
        const profile = Helpers.get({
            url: Constants.GET_USER_PROFILE,
        });
        return profile;
    }
}

export default new UserServices();
