---
title: Changing-width container
date: 2020-08-16
tags: ['js', 'css']
---

One of the things that I like from [Every Layout](https://every-layout.dev/) 
is that how each concept is taught. For every layout there is a demo that can
be launched. [See it for yourself here](https://every-layout.dev/demos/stack-split/).

When we click the play button, the container's width will be changing. First it will
be narrower then once it reaches certain width it will be wider and so on. This
way the reader can see how each layout responds to its container's width. Let's
try to implement it ourselves.

First create `index.html` file.

```html
<!doctype html>
<html>
<head>
  <title>Sample</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <button>Start</button>
  <div id="container"></div>
  <script src="index.js"></script>
</body>
</html>
```

Give it a little bit of css with `style.css` file.

```css
body {
  padding: 2em;
}

#container {
  background-color: #333;
  width: 60ch;
  height: 70vh;
  margin: 10vh auto;
}

button {
  width: 12ch;
  height: 6ch;
  text-align: center;
  margin: 0 auto;
  display: block;
}
```

Now for the javascript inside `index.js` file:

```javascript
;(function () {
  var button = document.querySelector('button');
  var container = document.querySelector('#container');

  var isIdle = true;
  var state = 0; // 1 -> wider, -1 -> narrower

  function sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function start (view, minWidth, maxWidth) {
    var change = 10; // width change in pixel per iteration
    var ms = 50; // duration to wait per iteration
    var width = Number(window.getComputedStyle(view).width.replace('px', ''));
    
    while (!isIdle) {
      if (state == 1) {
        width = width + change;
        if (width >= maxWidth) {
          width = maxWidth;
          state = 0;
        }
      } else {
        width = width - change;
        if (width <= minWidth) {
          width = minWidth;
          state = 1;
        }
      }
      view.style.width = width + 'px'; 
      await sleep(ms);
    }
  }

  button.addEventListener('click', function (event) {
    isIdle = !isIdle;
    if (isIdle) {
      button.innerText = 'Start';
    } else {
      button.innerText = 'Pause';
      start(container, 320, 960);
    }
  });
})();
```

We initialize necessary element and some flags first. Also a `sleep` function.

```javascript
var button = document.querySelector('button');
var container = document.querySelector('#container');

var isIdle = true;
var state = 0; // 1 -> wider, -1 -> narrower

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

At the end of the program, we listen to `click` event for button.

```javascript
button.addEventListener('click', function (event) {
  isIdle = !isIdle;
  if (isIdle) {
    button.innerText = 'Start';
  } else {
    button.innerText = 'Pause';
    start(container, 320, 960);
  }
});
```

Every time button is clicked, we toggle the state. Also change text inside button
accordingly. And if it's time for not idle right now, we start changing container's
width by calling `start` function. For the `start` function itself:

```javascript
async function start (view, minWidth, maxWidth) {
  var change = 10; // width change in pixel per iteration
  var ms = 50; // duration to wait per iteration
  var width = Number(window.getComputedStyle(view).width.replace('px', ''));
  
  while (!isIdle) {
    if (state == 1) {
      width = width + change;
      if (width >= maxWidth) {
        width = maxWidth;
        state = 0;
      }
    } else {
      width = width - change;
      if (width <= minWidth) {
        width = minWidth;
        state = 1;
      }
    }
    view.style.width = width + 'px'; 
    await sleep(ms);
  }
}
```

This function accepts 3 arguments:

* `view`: view/html element whose width are changing
* `minWidth`: lower limit of `view`'s width
* `maxWidth`: upper limit of `view`'s width

Basically what we do inside this function is looping until `isIdle` is not `false`
anymore. Like mentioned before, `isIdle` value is changed when user click the button.
For every iteration inside that loop, check whether `state` is 1 or not. 1 means
that `view`'s width should be increased, 0 decreased. Then add/substract `width` 
accordingly. If `width` already reached `minWidth` or `maxWidth`, change `state`.
Based on this `width`'s new value, we set `view`'s width.

Finally wait for a little while, then check again whether `isIdle` has changed.

<iframe 
    width="560"
    height="315" 
    src="https://www.youtube.com/embed/NPVFrWvUnWk" 
    frameborder="0" 
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
</iframe>
