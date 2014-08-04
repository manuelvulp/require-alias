### [Node.js] Alias

Library that might help you deal with Node paths 


```
npm install require-alias
```

## Table of Contents

- [Example](#example)

- [API](#api)
  - [`alias(String, Boolean)`](#alias)
 
  - `configure`

    - [`root(String)`](#root)

    - [`paths(Object)`](#paths)
    
  - [`storage`](#storage)

  - [`add(String, String)`](#add)

  - [`delete(String)`](#delete)

&nbsp;


#Example

&nbsp;

```javascript
var Alias = require('../lib/require-alias');

/**
 * In current descriptions context, ALIAS_ROOT points to path that is currently set as root in Alias library
 * and ROOT points to the root of this project. Also do note that all directories are surrounded with {} just
 * to avoid confusion
 *
 * -----------------------------------------------------------------------------------------------------------------
 *
 * By default ALIAS_ROOT points to your projects main file / runnable. Currently we are running {example/app.js} file
 * which means our ALIAS_ROOT points to {ROOT/example/} folder. Say we wanted that all our aliases should be relative
 * to absolute root, so we manually configure this.
 */

Alias.configure.root('../');

/**
 * Everything is now relative to {/example/../} aka {ROOT}
 * Lets setup few aliases to point to some folders
 */

Alias.configure.paths({
    '@foo': 'example/folders/foo', // {ROOT/example/folders/foo}
    '@folders': 'example/folders' // {ROOT}/example/folders}
});

/**
 * Require files and execute
 */

var foo = alias('@foo/file');
var bar = alias('@folders/bar/file');

foo(); // Output: 'Hello Foo'
bar(); // Output: 'Hello Bar' 

/**
 * Often we need paths, not exports. To get paths, pass in second parameter as 'true' to alias
 */

var fooPath = alias('@foo/file', true);
var barPath = alias('@folders/bar/file', true);

console.log(fooPath); // Output: ./../example/folders/foo/file
console.log(barPath); // Output: ./../example/folders/bar/file

/**
 * NB! If you haven't configured an alias for a path that you are trying to require, it will use the default require
 * method. In other words:
 *
 * alias('folders/foo/file');
 *    is
 * require('folders/foo/file');
 */

var fooAlias = alias('./folders/foo/file');
var fooRequire = require('./folders/foo/file');

fooAlias(); // Output: 'Hello Foo'
fooRequire(); // Output: 'Hello Foo'

var barAlias = alias('../example/folders/bar/file');
var barRequire = require('../example/folders/bar/file');

barAlias(); // Output: 'Hello Bar'
barRequire(); // Output: 'Hello Bar'

/**
 * Because no relative path is defined (./ or ../), Alias tries to require this file as ALIAS_ROOT + your_path
 */
 
var bazAlias = alias('example/baz'); 
// var bazRequire = require('example/baz'); // Does not work

bazAlias(); // Output: 'Hello Baz'
// bazRequire(); // Output: throws error
```


#API
List of all available methods

&nbsp;

#### `alias(String, Boolean)`

&nbsp;

- `String` - path to your file

- `Boolean` - Return file or path

&nbsp;

```javascript
// $ node example/app.js
var file = alias('foo') // Returns export of file example/foo.js
```


```javascript
// $ node example/app.js
var file = alias('foo', true) // Returns path to example/foo
```

&nbsp;

#### `root(String)`

&nbsp;

- `String` - Assign new root relative to your main runnable

&nbsp;

```javascript
// $ node example/dir/app.js
var Alias = require('require-alias');
Alias.configure.root('../');
// root is now example instead on example/dir
```

&nbsp;

#### `paths(Object)`

&nbsp;

- `Object` - Key-value object as key of alias and value of path

&nbsp;

```javascript
// $ node example/app.js
var Alias = require('require-alias');
Alias.configure.paths({
    '@foo': 'folders/foo',
    '@bar': 'folder/test/bar'
});
// alias('@foo', true) points to example/folders/foo
// alias('@bar/test') points to example/folders/example/bar/test.js
```

&nbsp;

#### `storage`

&nbsp;

Returns current aliases as key-value object

```javascript
// $ node example/app.js
var Alias = require('require-alias');
Alias.configure.paths({
    '@foo': 'folders/foo',
    '@bar': 'folder/example/bar'
});
```

&nbsp;

#### `add(String, String)`

&nbsp;

- `String` - Name of alias prefixed with `@` eg `@foo`
&nbsp;

- `String` - Path reference of alias eg `../folder/another/folder`

&nbsp;


Add new alias to storage

```javascript
// $ node example/app.js
var Alias = require('require-alias');
Alias.add('@foo', 'example/foo');

var foobar = Alias.storage;

/** 
 * foobar equals
 * 
 * {
 *     '@foo': 'example/foo',
 * }
 * 
 */
```

&nbsp;

#### `delete(String)`

&nbsp;

- `String` - Name of existing alias
&nbsp;

Deletes alias from storage

```javascript
// $ node example/app.js
var Alias = require('require-alias');
Alias.add('@foo', 'example/foo');

var foobar = Alias.storage;

/** 
 * foobar equals
 * 
 * {
 *     '@foo': 'example/foo',
 * }
 * 
 */
 
Alias.delete('@foo');

/** 
 * foobar equals
 * 
 * {}
 * 
 */
 
```

