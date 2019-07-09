/**
 * @param {Object} file 从上传组件得到的文件对象
 * @returns {Promise} resolve参数是解析后的二维数组
 * @description 从Csv文件中解析出表格，解析成二维数组
 */
export const getArrayFromFile = (file) => {
    let nameSplit = file.name.split('.');
    let format = nameSplit[nameSplit.length - 1];
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.readAsText(file); // 以文本格式读取
        let arr = [];
        reader.onload = function (evt) {
            let data = evt.target.result; // 读到的数据
            let pasteData = data.trim();
            arr = pasteData.split((/[\n\u0085\u2028\u2029]|\r\n?/g)).map(row => {
                return row.split('\t');
            }).map(item => {
                return item[0].split(',');
            });
            if (format === 'csv') resolve(arr);
            else reject(new Error('[Format Error]:你上传的不是Csv文件'));
        };
    });
};
