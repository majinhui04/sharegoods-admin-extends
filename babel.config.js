let presets = ['@vue/app'];

if(process.env['ENV'] === 'Utils') {
    presets = ['@babel/preset-env']
}
module.exports = {
    presets
};
