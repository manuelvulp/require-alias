var nodePath = require('path');
var mainFileDir = nodePath.dirname(require.main.filename) + '/';

module.exports = {
    /**
     * Replaces alias with according path
     * @param alias
     * @param Alias
     * @returns {XMLList|XML|*|Array}
     */

    getAliasAsPath: function (alias, Alias) {
        var matched = this.getMatchedAlias(alias);
        return matched ? this.fromRoot(this.replaceAlias(alias, matched[0], Alias.storage()), Alias) : this.fromRoot(alias, Alias);
    },

    /**
     * Returns matched alias of path
     * @param alias
     * @returns string
     */

    getMatchedAlias: function (alias) {
        return alias.match(/@[^/]*/);
    },

    /**
     * Replaces alias with correct path
     * @param aliasedPath
     * @param key
     * @param storage
     * @returns {*|XML|string|void}
     */

    replaceAlias: function (aliasedPath, key, storage) {
        return aliasedPath.replace(key, storage[key]);
    },

    /**
     * Prepends root to destination
     * @param destination
     * @returns {XMLList|XML|*|Array}
     */

    fromRoot: function (destination, Alias) {
        return nodePath.normalize(Alias.root.get() + destination);
    }
};