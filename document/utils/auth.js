import Cookies from 'js-cookie';

const TokenKey = 'Admin-Token';
const UserKey = 'Admin-uuid';

export function getToken() {
    return Cookies.get(TokenKey);
}

export function setToken(token) {
    return Cookies.set(TokenKey, token);
}

export function removeToken() {
    return Cookies.remove(TokenKey);
}

export function getUserInfo() {
    try {
        return JSON.parse(sessionStorage.getItem(UserKey));
    } catch (e) {
        return null;
    }
}

export function setUserInfo(data) {
    return sessionStorage.setItem(UserKey, JSON.stringify(data));
}

export function removeUserInfo() {
    return sessionStorage.removeItem(UserKey);
}
