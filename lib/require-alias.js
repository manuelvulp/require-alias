var mainFileDir = require('path').dirname(require.main.filename) + '/';
var root = mainFileDir;

/**
 * Key-value storage of aliases
 * @type {{storage: {}}}
 */

var Alias = {
    storage: {}
};

/**
 * Add alias to storage
 * @param alias
 * @param path
 * @returns {*}
 */

Alias.add = function (alias, path) {
    return Alias.storage[alias] = path;
};

/**
 * Remove existing alias from storage
 * @param alias
 * @returns {*}
 */

Alias.delete = function (alias) {
    return delete Alias.storage[alias];
};

Alias.configure = {
    root: function (newRoot) {
        root = mainFileDir + newRoot;
    },

    paths: function (aliases) {
        return Alias.storage = aliases;
    }
};

var getAliasAsPath = function (aliasedPath, fallback) {
    var matched = getMatchedAlias(aliasedPath);

    if (matched) {
        var key = matched[0];
        if (Alias.storage[key]) {
            return fromRoot(replaceAlias(aliasedPath, key));
        } else {
            return fromRoot(aliasedPath.replace(key, ''));
        }
    }
    else if (aliasedPath.substring(0, 2) == './' || aliasedPath.substring(0, 3) == '../') {
        var calledDirectory = fallback.substr(0, fallback.lastIndexOf('\\'));
        return calledDirectory + '/' + aliasedPath;
    }
    else {
        return fromRoot(aliasedPath);
    }
};

var getMatchedAlias = function (path) {
    return path.match(/@[^/]*/);
};

var replaceAlias = function (aliasedPath, key) {
    return aliasedPath.replace(key, Alias.storage[key]);
};

var fromRoot = function (destination) {
    return root + destination;
};

var getCallerFilename = function () {
    var orig = Error.prepareStackTrace;
    Error.prepareStackTrace = function (_, stack) {
        return stack;
    };
    var err = new Error;
    Error.captureStackTrace(err, arguments.callee);
    var stack = err.stack;
    return stack[2].receiver.filename;
};

module.exports = Alias;

/**
 * Assign alias to global
 * @param path
 * @returns {*}
 */

global.alias = function (path, asPath) {
    getCallerFilename();
    var aliased = getAliasAsPath(path, getCallerFilename());
    return asPath ? aliased : require(aliased);
};