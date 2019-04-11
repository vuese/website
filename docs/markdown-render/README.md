# @vuese/markdown-render

[@vuese/markdown-render](/markdown-render/) is a tool that renders the `markdown` string based on the result of [@vuese/parser](/parser/).

## Installation

```sh
yarn add @vuese/markdown-render
```

## Usage


```js {11-15}
// Import parser function
import { parser } from '@vuese/parser'
import { Render } from '@vuese/markdown-render'

// Read vue file content
const source = fs.readFileSync('path-to-your-component.vue', 'utf-8')

// Parse and get the result using the parser function
try {
  const parserRes = parser(source)
  // Create a render instance
  const r = new Render(parserRes)
  // Basic rendering, the return value is an object
  const renderRes = r.render()
  // Render full markdown text, return value is markdown string
  const markdownRes = r.renderMarkdown()
} catch(e) {
  console.error(e)
}
```

::: danger
`@vuese/markdown-render` can only handle the default processing results of the `@vuese/parser` module correctly.
:::

## Render Class

The type of the `@vuese/markdown-render` module default export class is as follows:

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
Focus on the highlighted code.
:::

The constructor of the `Render` class takes two arguments: the parsing result of the `@vuese/parser` module, and an optional option object.

## RenderOptions

* Type：

```ts
interface RenderOptions {
  props: string[]
  slots: string[]
  events: string[]
  methods: string[]
}
```

* Default:

```js
{
  props: ['Name', 'Description', 'Type', 'Required', 'Default'],
  events: ['Event Name', 'Description', 'Parameters'],
  slots: ['Name', 'Description', 'Default Slot Content'],
  methods: ['Method', 'Description', 'Parameters']
}
```

As you may have noticed, the string in each array is the title of the rendered table. But unfortunately, you can't change their names, but you can change their order to sort the columns of the rendered table.

## Instance method - render

Calling the `r.render()` function returns a result with `RenderResult` type:

```ts
interface RenderResult {
  props?: string
  slots?: string
  events?: string
  methods?: string
}
```

An example is:

```js
{
  "props": "|Name|Description|Type|Required|Default|\n|---|---|---|---|---|\n|name|The name of the form, up to 8 characters|`String` / `Number`|`true`|-|\n",
  "slots": "|Name|Description|Default Slot Content|\n|---|---|---|\n|header|Form header|`<th>title</th>`|\n",
  "events": "|Event Name|Description|Parameters|\n|---|---|---|\n|onclear|Fire when the form is cleared| The argument is a boolean value representing xxx|\n",
  "methods": "|Method|Description|Parameters|\n|---|---|---|\n|clear|Used to manually clear the form|-|\n"
}
```

## Instance method - renderMarkdown

Calling the `r.renderMarkdown()` function returns the full `markdown` string and component name. Essentially, that's the combination of the return values of the `r.render()` function:

```ts
interface MarkdownResult {
  content: string
  componentName: string
}
```
