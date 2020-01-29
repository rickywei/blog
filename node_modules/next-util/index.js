const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const { merge } = require('lodash');

module.exports = function(hexo, pluginDir) {
  this.hexo = hexo;
  this.pluginDir = pluginDir;
  this.getFilePath = function(file) {
    return this.pluginDir ? path.resolve(this.pluginDir, file) : file;
  }
  this.getFileContent = function(file) {
    return fs.readFileSync(this.getFilePath(file), 'utf8');
  }
  this.defaultConfigFile = function(key, file) {
    let defaultConfig = yaml.safeLoad(this.getFileContent(file));
    this.hexo.config[key] = merge(defaultConfig[key], this.hexo.theme.config[key], this.hexo.config[key]);
    return this.hexo.config[key];
  }
}
