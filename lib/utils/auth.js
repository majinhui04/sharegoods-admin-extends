"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToken = getToken;
exports.setToken = setToken;
exports.removeToken = removeToken;
exports.getUserInfo = getUserInfo;
exports.setUserInfo = setUserInfo;
exports.removeUserInfo = removeUserInfo;

var _jsCookie = _interopRequireDefault(require("js-cookie"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TokenKey = 'Admin-Token';
var UserKey = 'Admin-uuid';

function getToken() {
  return _jsCookie.default.get(TokenKey);
}

function setToken(token) {
  return _jsCookie.default.set(TokenKey, token);
}

function removeToken() {
  return _jsCookie.default.remove(TokenKey);
}

function getUserInfo() {
  try {
    return JSON.parse(sessionStorage.getItem(UserKey));
  } catch (e) {
    return null;
  }
}

function setUserInfo(data) {
  return sessionStorage.setItem(UserKey, JSON.stringify(data));
}

function removeUserInfo() {
  return sessionStorage.removeItem(UserKey);
}