"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getArrayFromFile = void 0;

/**
 * @param {Object} file 从上传组件得到的文件对象
 * @returns {Promise} resolve参数是解析后的二维数组
 * @description 从Csv文件中解析出表格，解析成二维数组
 */
var getArrayFromFile = function getArrayFromFile(file) {
  var nameSplit = file.name.split('.');
  var format = nameSplit[nameSplit.length - 1];
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.readAsText(file); // 以文本格式读取

    var arr = [];

    reader.onload = function (evt) {
      var data = evt.target.result; // 读到的数据

      var pasteData = data.trim();
      arr = pasteData.split(/[\n\u0085\u2028\u2029]|\r\n?/g).map(function (row) {
        return row.split('\t');
      }).map(function (item) {
        return item[0].split(',');
      });
      if (format === 'csv') resolve(arr);else reject(new Error('[Format Error]:你上传的不是Csv文件'));
    };
  });
};

exports.getArrayFromFile = getArrayFromFile;