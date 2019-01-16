# 概览

[Vuese](https://github.com/vuese/vuese) 为你的 `vue` 组件自动生成文档，它提供了多种生成组件文档的解决方案，用来满足你不同的需求。

## @vuese/cli

[@vuese/cli](/zh/cli/) 是一个命令行工具，使用它非常简单，如果你希望快速为你的 `vue` 组件建立文档网站或只想为你的 `vue` 组件生成 `markdown` 文档，那么这个工具或许是个不错的选择。详情请移步：[@vuese/cli](/zh/cli/)

## @vuese/parser

[@vuese/parser](/zh/parser) 模块是 `vue` 组件的解析器，[@vuese/cli](/zh/cli/) 内部通过 [@vuese/parser](/zh/parser) 模块解析 `vue` 组件，并提取想要得到的信息。你可以通过 [@vuese/parser](/zh/parser) 模块提供的接口做任何更高级的事情，`API` 文档请移步：[@vuese/parser](/zh/parser)。

## @vuese/markdown-render

[@vuese/markdown-render](/zh/markdown-render) 模块接收 [@vuese/parser](/zh/parser) 模块返回的对 `vue` 组件的解析结果，并生成 `markdown` 字符串。[@vuese/cli](/zh/cli/) 的文档生成功能也应用到了该模块，换句话说，你可以单独使用 [@vuese/parser](/zh/parser) 和 [@vuese/markdown-render](/zh/markdown-render) 来编写你自己的 `CLI` 工具，从而实现一些有趣的东西。

## @vuese/loader

[@vuese/cli](/zh/cli/) 是一个快速创建 [docute](https://github.com/leptosia/docute) 文档站点的工具，它不具有更灵活的文档解决方案。因为你或许已经为你的组件建立了文档站点，你只是希望 `Vuese` 能为你完成能够自动完成的东西，比如提取组件的接口信息自动生成 `markdown` 表格。此时你可以使用 [@vuese/loader](/zh/loader) 配合 [@vuese/webpack-plugin](/zh/webpack-plugin) 帮助你以“自动”的方式维护你的组件文档，节省你的时间。

## @vuese/webpack-plugin

[TODO]