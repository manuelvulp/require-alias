var path = require('path');
var expect = require('must');
var Alias = require(path.join(process.cwd(), 'src', 'require-alias'));

describe('Alias', function () {

    var alias;

    // Mocha root directory is node_modules/mocha/bin
    var root = path.join('../../../example/');

    beforeEach(function () {
        alias = new Alias();
    });

    it('should set root to given path', function () {
        var newRoot = 'this/is/my/new/root';
        var returnRoot = alias.root.set(newRoot);
        expect(returnRoot).to.equal(newRoot);
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
        expect(fooPath.indexOf('example\\folders\\foo\\file') > -1).to.be.true();
    });

    it('should correct module export', function () {
        alias.root.set(root);
        var fooPath = alias.require('folders/foo/file');
        expect(fooPath() === 'Hello Foo').to.be.true();
    });

});