---
title: Create tree clone using javascript
date: 2020-07-11
tags: ['js', 'command-line']
---

While reading [node's fs module docs][node-fs], I got an idea to create a
[tree][tree] clone using javascript. For those of you who doesn't know what
tree is, it's a shell command to print directory structure. So if we run `tree`
without any arguments, it will print out current directory structure.

``` bash
$ tree
.
├── layouts
│   ├── base.html
│   ├── home.html
│   ├── micro-blog.html
│   └── post.html
└── partials
    └── main-nav.html

2 directories, 5 files
```

So I tried to create one and after many modifications I came up with the program
below.

``` js
#!/usr/bin/env node

const fs = require('fs').promises;
const d = process.argv[2];

if (!d) d = '.';

async function traverse(dir, indentation) {
  var files = await fs.readdir(dir);
  for (var i = 0; i < files.length; i++) {
    var f = files[i];

    if (i != files.length - 1) {
      console.log(indentation + '├── ' + f);
    } else {
      console.log(indentation + '└── ' + f);
    }

    var path = dir + '/' + f;
    var isDir = (await fs.stat(path)).isDirectory();
    if (isDir) {
      var newIndentation = (i == files.length -1)?
        indentation + '    ':
        indentation + '│   ';
      await traverse(path, newIndentation);
    }
  }
}

console.log(d);
traverse(d, '').then(res => {}).catch(err => console.log(err));
```

It was difficult to find the right unicode character just like shell tree output
and then I realized why not just copy it from shell tree output. I realized this
after a few hours :))

It's not exactly like shell tree command because it doesn't accept any options
but I consider it a good practice. I learn a bit about fs module while writing
this program.

[node-fs]: https://nodejs.org/api/fs.html
[tree]: https://linux.die.net/man/1/tree
