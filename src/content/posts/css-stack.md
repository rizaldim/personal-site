---
title: Stack class di CSS
date: 2020-07-06
tags: ['css']
---

Di CSS kita bisa bikin satu class khusus untuk stack atau tumpukan. Contoh use
case nya itu saat kita nulis satu artikel dan kita pengennya setiap paragraf di
artikel tersebut ada margin atasnya. Misal ada artikel dengan judul, 5 paragraf,
dan 1 image. Kita bisa bikin html-nya seperti ini:

``` html
<article>
	<h2>Title</h2>
	<p>Paragraph 1</p>
	<p>Paragraph 2</p>
	<img src="cute-cat.png">
	<p>Paragraph 3</p>
</article>
```

Jika kita ingin semua html element di dalam article memiliki margin atas, kecuali
element h2, kita bisa lakukan dengan memakai css seperti ini:

``` css
article > * + * {
	margin-top: 1em;
}
```

Karena seringnya kita menemui keadaan seperti ini saat memberi style ke halaman
html ada baiknya kita buat satu class untuk itu.

``` css
.stack > * + * {
	margin-top: 1em;
}
```

