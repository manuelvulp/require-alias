var nodePath = require('path');
var mainFileDir = nodePath.dirname(require.main.filename) + '/';
var utils = require('./utils');

var Alias = function (opts) {

    opts = opts ? opts : {};

    var root = opts.root ? opts.root : mainFileDir;

    var storage = opts.aliases ? opts.aliases : {};

    this.root = {
        set: function (newRoot) {
            return root = nodePath.normalize(mainFileDir + newRoot);
        },

        get: function () {
            return root;
        }
    };

    this.storage = function (alias) {
        return alias ? storage[alias] : storage;
    };

    this.add = function (alias, path) {
        if (alias instanceof Object) {
            for (var index in alias) {
                storage[index] = alias[index];
            }
            return storage;
        } else {
            return storage[alias] = path;
        }
    };

    this.delete = function (alias) {
        if (alias instanceof Array) {
            for (var i = 0; i < alias.length; i ++) {
                delete storage[alias[i]];
            }
            return storage;
        } else {
            return delete storage[alias];
        }
    };

    this.path = function (alias) {
        return utils.getAliasAsPath(alias, this);
    };

    this.require = function (alias) {
        return require(utils.getAliasAsPath(alias, this));
    };
};

module.exports = Alias;