var path = require('path');

var expect = require('must');

describe('Alias', function () {

    var Alias;
    var paths;

    beforeEach(function () {
        Alias = require(path.join(process.cwd(), 'lib', 'require-alias'));

        // Alias root directory is node_modules/mocha/bin
        Alias.configure.root('../../../test/lib/');

        paths = Alias.configure.paths({
            '@foo': 'foo',
            '@bar': 'foo/bar'
        });
    });

    it('should have contain key-value pair @foo: foo', function () {
        expect(Alias.storage).to.have.property('@foo');
        expect(Alias.storage['@foo']).to.equal('foo');
    });

    it('should return string \'Hello World\' when executed aliased file', function () {
        var returnHelloWorld = alias('file');
        expect(returnHelloWorld()).to.equal('Hello World');
    });

    it('should contain new key-value pair @baz: foo/baz', function () {
        Alias.add('@baz', 'foo/baz');
        expect(Alias.storage).to.have.property('@baz');
        expect(Alias.storage['@baz']).to.equal('foo/baz');
    });

    it('should not contain key pair @bar', function () {
        Alias.delete('@bar');
        expect(Alias.storage).to.not.have.property('@bar');
    });

    it('@foo should resolve to real path that points to foo', function () {
        var realPath = '\\test\\lib\\foo';
        var normalized = path.normalize(alias('@foo', true));
        expect(normalized.indexOf(realPath) > -1).to.be.true();
    });

//    TODO
//    it('should resolve to file.js', function () {
//        var foo = alias('./foo/file', true);
//        expect(foo()).to.equal('foo');
//    });

});