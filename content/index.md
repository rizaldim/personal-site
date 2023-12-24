---
layout: layout.njk
title: home
---

## Posts

<ul>
{%- for post in collections.posts | reverse -%}
    <li>
        <a href="{{ post.url }}">
            {{ post.data.title }}
        </a>
    </li>
{%- endfor -%}
</ul>
