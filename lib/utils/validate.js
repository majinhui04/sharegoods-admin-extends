"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isvalidUsername = isvalidUsername;
exports.validateURL = validateURL;
exports.validateLowerCase = validateLowerCase;
exports.validateUpperCase = validateUpperCase;
exports.validatAlphabets = validatAlphabets;
exports.isExternal = isExternal;

/**
 * Created by jiachenpan on 16/11/18.
 */
function isvalidUsername(str) {
  var valid_map = ['admin', 'editor'];
  return valid_map.indexOf(str.trim()) >= 0;
}
/* 合法uri*/


function validateURL(textval) {
  var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return urlregex.test(textval);
}
/* 小写字母*/


function validateLowerCase(str) {
  var reg = /^[a-z]+$/;
  return reg.test(str);
}
/* 大写字母*/


function validateUpperCase(str) {
  var reg = /^[A-Z]+$/;
  return reg.test(str);
}
/* 大小写字母*/


function validatAlphabets(str) {
  var reg = /^[A-Za-z]+$/;
  return reg.test(str);
}
/**
 * @param {string} path
 * @returns {Boolean}
 */


function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}