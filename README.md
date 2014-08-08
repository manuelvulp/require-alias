[![Coverage Status](https://img.shields.io/coveralls/manuelvulp/require-alias.svg)](https://coveralls.io/r/manuelvulp/require-alias)
[![Codeship Status for manuelvulp/require-alias](https://codeship.io/projects/9276ef20-fea0-0131-5487-5eefab01992e/status?branch=master)](https://codeship.io/projects/29590)
![Alias logo](https://raw.githubusercontent.com/manuelvulp/require-alias/master/img/alias.jpg)

### [Node.js] Alias

Library that might help you deal with Node paths 

```
npm install require-alias
```

## Table of Contents

- [Quick example](#quick-example)

- [Full example](#full-example)

- [API](#api)
 
  - `alias`
 
    - `root`

        - [`set(String)`](#aliasrootsetstring)

        - [`get()`](#aliasrootget)
 
    - [`storage(String)`](#aliasstoragestring)
 
    - [`add(String, String)`](#aliasaddstring-string)
 
    - [`add(Object)`](#aliasaddobject)
 
    - [`delete(String)`](#aliasdeletestring)
 
    - [`delete(Array)`](#aliasdeletearray)
 
    - [`path(String)`](#aliaspathstring)
 
    - [`require(String)`](#aliasrequirestring)

#Quick example

(Of how one might use it in project)

Simple application with three files and some folders with structure like:

`C:\test ` - the application folder

`C:\test\this\is\an\example.js ` - random export of function that returns string 'foo'
```javascript
module.exports = function () {
    return 'foo';
};
```
`C:\test\app.js ` - the main runnable where to configure alias
```javascript
var Alias = require('require-alias');

global.alias = new Alias({
    aliases: {
        '@root': './',
        '@folder': 'this/is/an/'
    }
});

alias.require('@root/random');
```
`C:\test\random.js ` - just a random file to test alias
```javascript
// Can be done in any file as long as aliases are defined first and assigned to global
var path = alias.path('@folder/example');
console.log(path); // Output: C:\test\this\is\an\example

var module = alias.require('@folder/example');
console.log(module()); // Output: foo
```

#Full example

```javascript
/**
 * Require and configure Alias with initial options
 */

var Alias = require('../src/require-alias');

var exampleAlias = new Alias({

    root: './app/',

    aliases: {
        '@models': 'models',
        '@random': 'random',
        '@another': 'another/path',
        '@and': 'another/path'
    }

});

/**
 * Add some more aliases
 */

exampleAlias.add({
    '@handlers': 'handlers',
    '@bar': 'models/bar'
});

/**
 * Add single alias
 */

exampleAlias.add('@bar', 'models/bar');

/**
 * Delete single alias
 */

exampleAlias.delete('@random');

/**
 * Delete multiple aliases
 */

exampleAlias.delete(['@another', '@and']);

/**
 * Get path to foo using alias + path
 */

var pathToFoo = exampleAlias.path('@handlers/for/foo');
var foo = require(pathToFoo);
console.log(foo()); // Output: Foo

/**
 * Get path to bar with using only alias
 */

var pathToBar = exampleAlias.path('@bar');
var bar = require(pathToBar);
console.log(bar()); // Output: Bar

/**
 * Require module using alias
 */

var moduleFoo = exampleAlias.require('@handlers/for/foo');
console.log(moduleFoo()); // Output: Foo

/**
 * This is the basic usage.
 *
 * You can also use it in other ways to make your life easier. Say you don't like
 * the functionality of default require and do not wish to write most of the time
 *
 *      require(alias('@foo/bar'))
 *
 * You may assign alias to global variable and use it instead of require:
 */

global.alias = exampleAlias;

/**
 * Just an example
 */

alias.add('@baz', 'baz');
var baz = alias.require('@baz');
console.log(baz()); // Output: Baz

var pathToBaz = alias.path('@baz');
console.log(pathToBaz); // Output: C:\require-alias\example\app\baz (Or wherever
                        // your project is located

/**
 * Note
 *
 * Whether you assign alias to global variable or not is up to you. Even though it is
 * highly recommended (and also a good practice) to not assign anything to global
 * variables, this might be a good candidate for global scope. The intent of this
 * "helper" was to make requiring modules and paths easier, maybe even replace the
 * majority of cases where "require" is used.
 *
 */
```

#API

```javascript
var alias = new Alias();
```

#### `alias.root.set(String)`


- `String` - New root path

#### `alias.root.get()`


- Returns current root


#### `alias.storage(String)`


Returns path of given alias or the whole storage


- `String` (optional) - Alias (eg `'@foo'`)


#### `alias.add(String, String)`


Add single alias


- `String` - Alias (eg `'@foo'`)


- `String` - Path reference of alias (eg `'../folder/another/folder'`)


#### `alias.add(Object)`


Add single / multiple alias(es)


- `Object` - Key-value object where key is alias and value is path reference alias (eg `{@foo: 'foo/bar'}`)


#### `alias.delete(String)`


Deletes single alias


- `String` - Alias (eg `'@foo'`)


#### `alias.delete(Array)`


Deletes multiple aliases


- `Array` - Array of strings, each being alias (eg `['@foo', '@bar']`)


#### `alias.path(String)`


Returns path reference of alias


- `String` - Alias (eg `'@foo'`)


#### `alias.require(String)`


Returns module export of alias


- `String` - Alias (eg `'@foo'`)

