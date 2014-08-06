var path = require('path');
var expect = require('must');
var Alias = require(path.join(process.cwd(), 'src', 'require-alias'));
var utils = require(path.join(process.cwd(), 'src', 'utils'));

describe('Utils', function () {

    var alias;
    var paths;

    // Mocha root directory is node_modules/mocha/bin
    var root = path.join(process.cwd(), 'example/');

    beforeEach(function () {
        alias = new Alias({
            root: root,

            aliases: {
                '@foo': 'foo/bar',
                '@baz': 'baz'
            }
        });
    });

    it('should replace alias in path', function () {
        var result = utils.getAliasAsPath('@foo', alias);
        expect(result.indexOf('foo\\bar') > -1).to.be.true();
    });

    it('should return matched alias', function () {
        var match = utils.getMatchedAlias('@foo');
        expect(match[0].length > 0).to.be.true();
    });

    it('should replace alias with path', function () {
        var match = utils.getMatchedAlias('@foo');
        var replaced = utils.replaceAlias('@foo/bar', match[0], alias.storage());
        expect(replaced.indexOf('foo/bar/bar') > -1).to.be.true();
    });

    it('should return path from root', function () {
        var destination = 'folders/foo';
        var fromRoot = utils.fromRoot(destination, alias);
        expect(fromRoot.indexOf('example\\folders\\foo') > -1).to.be.true();
    });

});