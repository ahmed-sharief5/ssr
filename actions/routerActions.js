export const routerActionTypes = {
    UPDATE_ROUTER_STATE : 'UPDATE_ROUTER_STATE',
    NAVIGATE : 'NAVIGATE',
}

/**
 *
 */
class RouterActions{

    /**
     *
     * @param pathname
     * @returns {{type: string, pathname: *}}
     */
    navigate(pathname) {
        return {
            type: routerActionTypes.NAVIGATE,
            pathname,
        };
    }


    /**
     *
     * @param state
     * @returns {{state: *, type: string}}
     */
    updateRouterState(state) {
        return {
            type: routerActionTypes.UPDATE_ROUTER_STATE,
            state,
        };
    }
}

export default new RouterActions();
