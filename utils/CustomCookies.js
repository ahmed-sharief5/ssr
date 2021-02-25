import Cookies from 'js-cookie';

class CustomCookies extends Cookies {
    static getCookie(key) {
        return Cookies.get(key);
    }

    static getCookies() {
        return Cookies.getJSON();
    }

    static setCookie(key, value, expiresInSeconds) {
        Cookies.set(key, value, { expires: expiresInSeconds ? new Date(new Date().getTime() + parseInt(expiresInSeconds) * 1000) : 1 });
    }

    static setCookies(cookies) {
        Object.keys(cookies).forEach((key) => {
            Cookies.set(key, cookies[key], { expires: 1 })
        })
    }

    static removeCookie(key) {
        Cookies.remove(key);
    }

    static removeCookies() {
        Object.keys(Cookies.getJSON()).forEach((key) => {
            Cookies.remove(key);
        })
    }
}

export default CustomCookies;