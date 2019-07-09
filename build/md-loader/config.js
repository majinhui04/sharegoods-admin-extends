const Config = require('markdown-it-chain');
const anchorPlugin = require('markdown-it-anchor');
const slugify = require('transliteration').slugify;
const containers = require('./containers');
const overWriteFenceRule = require('./fence');
const checkboxPlugin = require('markdown-it-checkbox');

const config = new Config();

config.options.html(true).end().plugin('checkboxPlugin').use(checkboxPlugin, [
    {
        divWrap: true,
        divClass: 'cb',
        idPrefix: 'cbx_'
    }]).end()
    .plugin('anchor').use(anchorPlugin, [
    {
        level: 2,
        slugify: slugify,
        permalink: true,
        permalinkBefore: true
    }
]).end()

    .plugin('containers').use(containers).end();

const md = config.toMd();
overWriteFenceRule(md);

module.exports = md;
