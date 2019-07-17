"use strict";

/**
 * 希尔排序
 * 核心：通过动态定义的 gap 来排序，先排序距离较远的元素，再逐渐递进
 * @param {*} arr
 */
function shellSort(arr) {
  var len = arr.length;
  var gap = Math.floor(len / 2);

  while (gap > 0) {
    // gap距离
    for (var i = gap; i < len; i++) {
      var temp = arr[i];
      var preIndex = i - gap;

      while (arr[preIndex] > temp) {
        arr[preIndex + gap] = arr[preIndex];
        preIndex -= gap;
      }

      arr[preIndex + gap] = temp;
    }

    gap = Math.floor(gap / 2);
  }

  return arr;
}