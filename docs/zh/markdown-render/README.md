# @vuese/markdown-render

[@vuese/markdown-render](/zh/markdown-render) 是一个根据 [@vuese/parser](/zh/parser) 的结果渲染 `markdown` 字符串的工具。

## 安装

```sh
yarn add @vuese/markdown-render
```

## 使用

```js {11-15}
// 导入 parser 函数
import { parser } from '@vuese/parser'
import Render from '@vuese/markdown-render'

// 读取 vue 文件内容
const source = fs.readFileSync('path-to-your-component.vue', 'utf-8')

// 使用 parser 函数解析并得到结果
try {
  const parserRes = parser(source)
  // 创建渲染实例
  const r = new Render(parserRes)
  // 基本渲染，返回值是一个对象
  const renderRes = r.render()
  // 渲染完整的 markdown 文本，返回值是 markdown 字符串
  const markdownRes = r.renderMarkdown()
} catch(e) {
  console.error(e)
}
```

::: danger
`@vuese/markdown-render` 只能正确处理 `@vuese/parser` 模块的默认处理结果。
:::

## Render 类

`@vuese/markdown-render` 模块默认导出类的类型如下：

```ts {4,5,13}
class Render {
  parserResult: ParserResult
  options?: RenderOptions
  constructor(parserResult: ParserResult, options?: RenderOptions)
  render(): RenderResult
  propRender(propsRes: PropsResult[]): string
  slotRender(slotsRes: SlotResult[]): string
  eventRender(propsRes: EventResult[]): string
  methodRender(slotsRes: MethodResult[]): string
  renderTabelHeader(header: string[]): string
  renderTabelRow(row: string[]): string
  renderSplitLine(num: number): string
  renderMarkdown(): MarkdownResult | null
}
```

::: tip
如上高亮的三句代码是应该被关注的。
:::

`Render` 类的构造函数接收两个参数：`@vuese/parser` 模块的解析结果，以及一个可选的选项对象。

## RenderOptions

* 类型：

```ts
interface RenderOptions {
  props: string[]
  slots: string[]
  events: string[]
  methods: string[]
}
```

* 默认值：

```js
{
  props: ['Name', 'Description', 'Type', 'Required', 'Default'],
  events: ['Event Name', 'Description', 'Parameters'],
  slots: ['Name', 'Description', 'Default Slot Content'],
  methods: ['Method', 'Description', 'Parameters']
}
```

你可能已经注意到了，每个数组中的字符串就是渲染出来的表格的标题。但很不幸，你不可以改变他们的名字，不过你可以改变他们的顺序，对渲染出的表格的列排序。

## 实例方法 - render

调用 `r.render()` 函数，会返回类型为 `RenderResult` 的结果：

```ts
interface RenderResult {
  props?: string
  slots?: string
  events?: string
  methods?: string
}
```

一个例子是：

```js
{
  "props": "|Name|Description|Type|Required|Default|\n|---|---|---|---|---|\n|name|The name of the form, up to 8 characters|`String` / `Number`|`true`|-|\n",
  "slots": "|Name|Description|Default Slot Content|\n|---|---|---|\n|header|Form header|`<th>title</th>`|\n",
  "events": "|Event Name|Description|Parameters|\n|---|---|---|\n|onclear|Fire when the form is cleared| The argument is a boolean value representing xxx|\n",
  "methods": "|Method|Description|Parameters|\n|---|---|---|\n|clear|Used to manually clear the form|-|\n"
}
```

## 实例方法 - renderMarkdown

调用 `r.renderMarkdown()` 函数，会返回完整的 `markdown` 字符串。本质上就是把 `r.render()` 函数的返回值做拼装处理。