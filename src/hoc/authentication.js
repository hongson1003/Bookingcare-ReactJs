import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";
import { Menu } from "../utils";

export const userIsAuthenticated = connectedRouterRedirect({
    authenticatedSelector: state => {
        return state.user.isLoggedIn;
    },
    wrapperDisplayName: 'UserIsAuthenticated',
    redirectQueryParam: '',
    redirectPath: '/login'
});

export const userIsNotAuthenticated = connectedRouterRedirect({
    // Want to redirect the user when they are authenticated
    authenticatedSelector: state => !state.user.isLoggedIn,
    wrapperDisplayName: 'UserIsNotAuthenticated',
    redirectPath: (state) => {
        let linkToRedirect = '';
        if (state.user && state.user.userInfo) {
            let role = state.user.userInfo.roleId;
            if (role === Menu.ADMIN) {
                linkToRedirect = '/system';
            } else if (role === Menu.DOCTOR) {
                linkToRedirect = '/doctor'
            }
        }
        return (
            `${linkToRedirect}`
        );
    },
    allowRedirectBack: false,
    redirectQueryParam: null
});