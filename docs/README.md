# Overview

> One-stop solution for vue component documentation

[Vuese](https://github.com/vuese/vuese) Automatically generate documentation for your `vue` component, and provides a variety of solutions for generating component documentation to meet your different needs.

## @vuese/cli

[@vuese/cli](/cli/) is a command line tool that is very simple to use. If you want to quickly build a documentation site for your `vue` component or just want to generate `markdown` document for your `vue` component, then this tool might be a good choice. Please go to the details: [@vuese/cli](/cli/)

## @vuese/parser

 The [@vuese/parser](/parser/) module is the parser for the `vue` component, [@vuese/cli](/cli/) internally parsing the `vue` component via the [@vuese/parser](/parser/) module and extract the information we want. You can do any more advanced things with the interface provided by the [@vuese/parser](/parser/) module. For the `API` documentation, please go to [@vuese/parser](/parser/)

 ## @vuese/markdown-render

 [@vuese/markdown-render](/markdown-render/) receives the result of the Vue file parsed by [@vuese/parser](/parser/) as a parameter,  generate a `markdown` string. [@vuese/markdown-render](/markdown-render/) is also used for [@vuese/cli](/cli/)'s document generation, in other words, you can use [@vuese/markdown-render](/markdown-render/) and [@vuese/parser](/parser/) alone to write your own `CLI` tool to do something interesting.

 ## @vuese/loader

`@vuese/cli` is a tool for quickly creating document prototypes that don't have a more flexible documentation solution. So this is why `@vuese/loader` and `@vuese/webpack-plugin` are needed.

Our goal is to focus only on the parts that can be automated, and does not limit how your document project is organized and what document framework is used. Of course, we can also provide fast solutions.

 ## @vuese/webpack-plugin

[TODO]