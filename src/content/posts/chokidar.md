---
title: Watch file changes using chokidar
date: 2020-07-18
tags: ['js']
---

I learned about [chokidar][chokidar] when I googled **How to detect file
changes** in a directory using javascript. It's a nodejs library to watch file
changes, created by [Paul Miller][paulm]. Before knowing about this library, I
found a tool called **watchexec** for the same purpose. The difference is that
watchexec is written in [Rust][rust]. I think it's more suitable to use tools
written in javascript for a javascript project.

## Setup

Let's make a directory for our small project. Name it **try-chokidar**. Do `npm
init -y` and then create a directory named `src` with some dummy files and
subdirectories inside it.

``` bash
$ mkdir try-chokidar && cd try-chokidar
$ npm init -y
$ mkdir -p src/{js,html,css}
$ touch src/html/{index,about,contact}.html src/css/style.css src/js/{main,module}.js
```

So now we have this directory structure.

``` bash
$ tree
.
├── package.json
└── src
    ├── css
    │   └── style.css
    ├── html
    │   ├── about.html
    │   ├── contact.html
    │   └── index.html
    └── js
        ├── main.js
        └── module.js

4 directories, 7 files
```

Install chokidar.

``` bash
$ npm install chokidar
```

## Basic use case

Create a file, `app.js` and then type in this code.

``` js
const chokidar = require('chokidar');

// One-liner for src directory
chokidar.watch('src').on('all', (event, path) => {
  console.log(event, path);
});
```

What we do in `app.js` is watching `src` directory and then on **all**
events print `event` and `path` of the corresponding file. Next run `node
app.js`.

``` bash
$ node app.js
addDir src
addDir src/css
addDir src/html
addDir src/js
add src/css/style.css
add src/html/about.html
add src/html/contact.html
add src/html/index.html
add src/js/main.js
add src/js/module.js
```

What happened when we run `app.js` is that chokidar add all files and
directories that it's watching. When I run this program for the first time, I'm
curious what `event` and `path`'s type is.  To find out, I modify `app.js` so
that the last part of the program look like this.

``` js
chokidar.watch('src').on('all', (event, path) => {
  console.log(typeof(event));
  console.log(typeof(path));
});
```

When I run it again, it turns out that both `event` and `path` are string.
And `path` is relative to current directory.

Now undo changes to `app.js` so that it will print out what `event` and
`path`'s values are. Then run it again and open another terminal. Change anything
inside `src` directory. For example if we do:

1. Delete contact.html
2. Rename index.html to home.html
3. Create new file lib.js inside js directory
4. Change content home.html

It will print out:

``` bash
unlink src/html/contact.html
add src/html/home.html
unlink src/html/index.html
add src/js/lib.js
change src/html/home.html
```

We can see that chokidar reports back to us any changes that happened with
specific event type. Then I got curious, what will happen if we change directory's name? So, I tried it. I change `src/html` to `src/pages`. The output:

``` bash
unlinkDir src/html
addDir src/pages
add src/pages/about.html
add src/pages/home.html
unlink src/html/about.html
unlink src/html/home.html
```

Chokidar reports every path changes that happened because of renaming that one
directory.

## What to watch

Chokidar's watch method takes 4 kinds of things to watch: `file`, `dir`,
`glob`, or `array`. Using this we can watch just 1 file, 1 directory,
files/directories based on glob, or an array of files and directories. Chokidar
uses [picomatch][pico] for glob matcher.

## Type of events

Chokidar's watch method return an instance of `FSWatcher`. This instance can
call `on` method which accepts two parameters: `event` and `callback`. It accepts
one of these strings: `add`, `addDir`, `change`, `unlink`, `unlinkDir`, `ready`,
`raw`, `error`, and `all`. Those strings, except for `all`, relate to one
specific event type. Use `all` if you want to detect all events except for
`raw`, `error`, and `ready`.

## Options

`watch` method actually accepts second argument, `options`. Check [chokidar's docs][chokidar] for the complete list. Some notable options are:

* `ignored`. Define files/paths to be ignored.
* `cwd`. The base directory from which watch `paths` will be derived.
* `depth`. We can set how many levels of directories will be traversed.

## Build tools using chokidar

So far, I've used (or tried) 3 bundlers so far: [webpack][webpack],
[parcel][parcel], and [rollup][rollup]. Out of those 3, only rollup lists
chokidar in its `package.json` file. A newer build tool, [snowpack][snowpack],
also seems to be using chokidar.

## Conclusion

I find that chokidar is quite reliable to detect changes inside a directory.
One potential use case for chokidar that I can think of is using it in a custom
build tool/process that we create based on our own logic. Anytime we detect
change, redo build step related to that specific change only, not the whole
process.

[chokidar]: https://github.com/paulmillr/chokidar
[rust]: https://www.rust-lang.org/
[pico]: https://github.com/micromatch/picomatch
[webpack]: https://webpack.js.org/
[rollup]: https://rollupjs.org/
[parcel]: https://parceljs.org/
[snowpack]: https://www.snowpack.dev/
[paulm]: https://paulmillr.com/
