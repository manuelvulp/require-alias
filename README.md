### [Node.js] Alias

Library that might help you deal with Node paths 


```
npm install require-alias
```

## Table of Contents

- [Example](#example)

- [API](#api)
 
  - `alias`
 
    - `root`

        - [`set(String)`](#setstring)

        - [`get()`](#get)
 
    - [`storage(String)`](#storagestring)
 
    - [`add(String, String)`](#addstring-string)
 
    - [`add(Object)`](#addobject)
 
    - [`delete(String)`](#deletestring)
 
    - [`delete(Array)`](#deletearray)
 
    - [`path(String)`](#pathstring)
 
    - [`require(String)`](#requirestring)

&nbsp;


#Example

&nbsp;

```javascript
/**
 * Require and configure Alias with initial options
 */

var Alias = require('../src/require-alias');

var exampleAlias = new Alias({

    root: './app/',

    aliases: {
        '@models': 'models',
        '@random': 'random'
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
 * highly recommended (good practice) to not assign anything to global variables, this
 * might be a good candidate for global scope. The intent of this "helper" was to make
 * requiring modules and paths easier, maybe even replace the majority of cases where
 * "require" is used.
 *
 */
```


#API

&nbsp;


```javascript
var alias = new Alias();
```

#### `alias.root.set(String)`

&nbsp;

- `String` - New root path

&nbsp;

#### `alias.root.get()`

&nbsp;

- Returns current root

&nbsp;

#### `alias.storage(String)`

&nbsp;

Returns path of given alias or the whole storage

&nbsp;

- `String` (optional) - Alias (eg `'@foo'`)

&nbsp;

#### `alias.add(String, String)`

&nbsp;

Add single alias

&nbsp;

- `String` - Alias (eg `'@foo'`)

- `String` - Path reference of alias (eg `'../folder/another/folder'`)

&nbsp;

#### `alias.add(Object)`

&nbsp;

Add single / multiple alias(es)

&nbsp;

- `Object` - Key-value object where key is alias and value is path reference alias (eg `{@foo: 'foo/bar'}`)

&nbsp;

#### `alias.delete(String)`

&nbsp;

Deletes single alias

&nbsp;

- `String` - Alias (eg `'@foo'`)

&nbsp;

#### `alias.delete(Array)`

&nbsp;

Deletes multiple aliases

&nbsp;

- `Array` - Array of strings, each being alias (eg `['@foo', '@bar']`)

&nbsp;

#### `alias.path(String)`

&nbsp;

Returns path reference of alias

&nbsp;

- `String` - Alias (eg `'@foo'`)

&nbsp;

#### `alias.require(String)`

&nbsp;

Returns module export of alias 

&nbsp;

- `String` - Alias (eg `'@foo'`)

&nbsp;

