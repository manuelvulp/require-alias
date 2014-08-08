var path = require('path');
var expect = require('must');
var Alias = require(path.join(process.cwd(), 'src', 'require-alias'));

describe('Alias', function () {

    var alias;

    var replaceSlashes = function (string) {
        return string.replace(/\//g, '').replace(/\\/g, '');
    };

    // Mocha root directory is node_modules/mocha/bin
    var root = path.join('../../../example/');

    beforeEach(function () {
        alias = new Alias();
    });

    it('should set root to given path', function () {
        var newRoot = root + 'folders/';
        var returnRoot = alias.root.set(newRoot);
        expect(replaceSlashes(returnRoot)).to.include('examplefolder');
    });

    it('should contain key "@foo" and "@bar" if passed these in an object', function () {
        alias.add({
            '@foo': 'foo/bar',
            '@bar': 'bar'
        });

        expect(alias.storage()).to.have.property('@foo');
        expect(alias.storage()).to.have.property('@bar');
    });

    it('should contain "@foo" if added to alias', function () {
        alias.add('@foo');
        expect(alias.storage()).to.have.property('@foo');
    });

    it('should not contain key @bar', function () {
        alias.add('@foo');
        alias.delete('@foo');
        expect(alias.storage()).to.not.have.property('@foo');
    });

    it('should not contain keys @foo, @bar if removed as an array', function () {
        alias.add({
            '@foo': 'foo/bar',
            '@bar': 'bar'
        });

        alias.delete(['@foo', '@bar']);
        expect(alias.storage()).to.not.have.property('@foo');
        expect(alias.storage()).to.not.have.property('@bar');
    });

    it('should return correct path of file', function () {
        alias.root.set(root);
        var fooPath = alias.path('folders/foo/file');
        expect(replaceSlashes(fooPath)).to.include('examplefoldersfoofile');
    });

    it('should correct module export', function () {
        alias.root.set(root);
        var fooPath = alias.require('folders/foo/file');
        expect(fooPath() === 'Hello Foo').to.be.true();
    });

});