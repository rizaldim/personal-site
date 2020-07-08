---
title: Stack class in CSS
date: 2020-07-06
tags: ['css']
---

I first learned this in [Every Layout][every-layout] book, a realy great book
written by [Andy Bell][andy-bell] and [Heydon Pickering][heydon]. In CSS we can
make a class for stack. An example use case is when we write an article and we
want top margin for every paragraph.

Let's say there's an article with a title, 5 paragraphs, and 1 image. We can
write it this way in HTML:

``` html
<article>
	<h2>Title</h2>
	<p>Paragraph 1</p>
	<p>Paragraph 2</p>
	<img src="cute-cat.png">
	<p>Paragraph 3</p>
</article>
```

If we want every children elements inside the article to have top margin except
the header (h2), then we can use this css:

``` css
article > * + * {
	margin-top: 1em;
}
```

Because this use case is quite common, we can write a class for stack like this.

``` css
.stack > * + * {
	margin-top: 1em;
}
```

[every-layout]: https://every-layout.dev/
[andy-bell]: https://hankchizljaw.com/
[heydon]: https://heydonworks.com/
