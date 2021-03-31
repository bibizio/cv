# Curriculum Vitae

First things first: sorry for my English. You may find errors in this file or somewere else in the code. If so, let me know....

This repo is meant to be a way to mantain my Curriculum Vitae using [markdown](https://www.markdownguide.org/getting-started/) and publish it on [GitHub Pages](https://pages.github.com/) (or somewhere else).

I was inspired by [elipapa markdown-cv](http://elipapa.github.io/markdown-cv/), but decided to write it from scratch to implement different things I needed (mobile responsive, generate a pdf at compile-time, an action to deploy on gh-pages on push, etc).

## Usage

1. fork the repo
2. create or edit a folder, and an _index.md_ file with your cv in it, for every language you want to use (the examples folders in my repo are only for showing layouts, delete them if you want)
3. chose a layout for your cv
4. configure the options in **_\_config.yml_** (not every option is available in every layout)

**now you can:**

### Build your cv locally (this project is written in [Jekyll](https://jekyllrb.com/))

1. Install Ruby, RubyGems and bundler (you can follow [these instructions](https://jekyllrb.com/docs/installation/))
2. run `bundle install`
3. run `jekyll serve` to review your cv on http://127.0.0.1:4000/cv or `jekyll build`: your cv will be generated in the **_\_site_** folder

### Publish it on GitHup Pages

**this option is active by default** and if you want to disable it, you need to do it in the _Actions_ menu as shown [here](https://docs.github.com/en/actions/managing-workflow-runs/disabling-and-enabling-a-workflow).

Every time you push on the main branch, the workflow will build your cv and publish it on `https://your-github-username.github.io/cv/`

## Layouts

You can change the layout of your cv using the name in the [front matter](https://jekyllrb.com/docs/front-matter/) of **_every_** index.md file.

The _title_ of the file should be you name (it is also used to form the PDF filename).

I created a couple more layouts for fun (and I probably will improve them)¸ but I'm not a Web Designer...

They're still work in progress for now, but feel free to [contribute](CONTRIBUTING.md).

- [magnolia](https://bibizio.github.io/cv)
- [freesia](https://bibizio.github.io/cv/en/examples/freesia)
- [tulip](https://bibizio.github.io/cv/en/examples/tulip)

### Layouts options

There are a set of options (mainly colours) that you can use in **_\_config.yml_** to change the defaults:

```yml
cv:
  accent-color:
  background-color:
  text-color:
  surtitle-color:
  updated-color:
  consent-color:
  link-color:
  languages:
  full-topbar:
```

the _languages_ options is an array containing the codes of the languages (the first language will be the default)

_full-topbar_ is used only in [magnolia](https://bibizio.github.io/cv) mobile version.

### Layout css classes

For the layouts I wrote, there are a couple of helpful css rules (using [kramdown block attributes](https://kramdown.gettalong.org/quickref.html#block-attributes)):

- for p, h2, h3 and h4, you can use `{:surtitle="this is a surtitle" subtitle="this is a subtitle"}` right before the line. It will add **_this is a surtitle_** as surtitle and **_this is a subtitle_** as subtitle.

- in case of links in subtitles, the previous method doesn't work, so you need to add a paragraph with the `{:.subtitle}` class.

- in case you need to force a page-break in the pdf, you can use the `{:.page-break}` class before the line you want to appear as the first one of the new page

- you can surround part of the text in a section using the section block (I used it for indentations)

  ```markdown
  {% section my-section-id %}
  some text
  some other text
  {% endsection %}
  ```

  will be rendered as

  ```html
  <section id="my-section-id">
    <p>some text</p>
    <p>some other text</p>
  </section>
  ```

- some layouts use [jekyll-contentblocks](https://github.com/rustygeldmacher/jekyll-contentblocks) for the _personal information_ content of the cv (marked as _info_). You can use it like this:

  ```markdown
  {% contentfor info %}
  my address
  my e-mail
  {% endcontentfor %}
  ```

## Languages

Since I needed to write my cv both in English and Italian, I created a project structure for it to be multilanguage.

For every language used, you need:

1. a folder named as the corresponding lang code in the root of the project.
2. a markdown in every folder forementioned (obviously written in the chosen language..... better to be clear), containing the lang code in the front matter
3. the _languages_ option in **_\_config.yml_**

If you don't need it, just delete every lang code directoy, the **_index.html_** file (used for redirect only) in the root of the project and create a **_index.md_** containg the front matter and your cv only. Also, delete the _languages_ option in **_\_config.yml_** (**_NOT the lang option in the front matter_**, it is also used for lang attribute of the html tag!).

### Flags

I "borrowed" the squared svg flags icons from [flag-icons](https://github.com/lipis/flag-icon-css), but imported in **_\_sass/main.css_** only a handfull of them. If your flag doesn't show, go in that file and add `@include flag(your-lang-code);` at the end of it.

If it still doesn't show after doing so, that means that either the svg filename is wrong (go and check if you find what you need in **_assets/svg_**) or it is not present, so you need to add the svg file yourself.

## Generate PDF at compile time

Every layout has a print media CSS so it can be easily printed via browser native functionality.
However I wanted the PDF to be statically generated at compile time, so I wrote a Jekyll plugin to do so.

That said, there are a few things to keep in mind:

- There are not so many tools for doing this in Ruby: I used [wiked_pdf](https://github.com/mileszs/wicked_pdf), a wrapper for the [wkhtmltopdf](https://wkhtmltopdf.org/) linux utility. It uses quite an old Qt library, so a lot of CSS rules just don't work.
- CSS [@Page](https://developer.mozilla.org/en-US/docs/Web/CSS/@page) rule is not fully supported by any browser.
- Not every layout I wrote support this functionality (for now, at least).
- I never wrote code in Ruby before: the plugin is simple, but I'm sure it can be improved.
