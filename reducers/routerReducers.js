import { routerActionTypes } from '../actions/routerActions';

/**
 *
 * @param state
 * @param action
 * @returns {RouterReducers.props|{pathname: string}|*}
 * @constructor
 */
const RouterReducers = (state = {  pathname: '/' }, action) => {
    switch (action.type) {
        case routerActionTypes.UPDATE_ROUTER_STATE: {
            return action.state
        }
        default: {
            return state;
        }
    }
};

export default RouterReducers;
