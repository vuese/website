# @vuese/parser

`vue` 单文件组件的解析器，分析 `vue` 文件的内容，返回解析结果。

## 基本使用

### 安装

```sh
yarn add @vuese/parser
```

### 使用

```js
// 导入 parser 函数
import { parser } from '@vuese/parser'

// 读取 vue 文件内容
const source = fs.readFileSync('path-to-your-component.vue', 'utf-8')

// 使用 parser 函数解析并得到结果
try {
  const parserRes = parser(source)
} catch(e) {
  console.error(e)
}
```

### parser 函数

`parser` 函数的类型如下：

```ts
(source: string, options?: ParserOptions): ParserResult
```

`parser` 函数接收两个参数，第一个参数是 `vue` 源文件的内容，第二个参数是可选的解析选项，返回值为解析的结果。

### ParserOptions

解析选项提供了一系列钩子，你可以选择放弃 `parser` 函数默认的解析结果，通过钩子选项完成更加定制化的功能，其类型如下：

```ts
export interface ParserOptions {
  onProp?: {
    (propsRes: PropsResult): void
  }
  onEvent?: {
    (eventRes: EventResult): void
  }
  onMethod?: {
    (methodRes: MethodResult): void
  }
  onSlot?: {
    (slotRes: SlotResult): void
  }
  onName?: {
    (name: string): void
  },
  onDesc?: {
    (desc: CommentResult): void
  },
  babelParserPlugins?: ParserPlugin[]
}
```

#### onProp

* 类型：`(propsRes: PropsResult): void`

当解析器遇到 `prop` 时触发，参数是 `prop` 被处理后的结果，查看：[PropsResult](#props-result)

#### onEvent

* 类型：`(eventRes: EventResult): void`

当解析器遇到事件时触发，参数是事件被处理后的结果，查看：[EventResult](#events-result)

#### onSlot

* 类型：`(slotRes: SlotResult): void`

当解析器遇到插槽时触发，参数是插槽被处理后的结果，查看：[SlotResult](#slots-result)

#### onMethod

* 类型：`(methodRes: MethodResult): void`

当解析器遇到方法时触发，参数是方法被处理后的结果，查看：[MethodResult](#methods-result)

#### onName

* 类型：`(name: string): void`

当解析器遇到组件的 `name` 选项时触发，参数是 `name` 选项的值。

#### onDesc

* 类型：`(desc: CommentResult): void`

当解析器遇到用来描述组件的注释节点时触发，参数是被处理后的注释信息，查看：[CommentResult](#comment-result)

#### babelParserPlugins

* 类型：`ParserPlugin[]`

用来指定 `babel parser` 的插件列表，全部列表可以查看：[https://babeljs.io/docs/en/babel-parser#plugins](https://babeljs.io/docs/en/babel-parser#plugins)

:::tip
babel 插件与babel parser 插件是两个不同的东西
:::

### ParserResult

默认情况下，解析器会使用内置的解析选项生成解析结果，它的类型如下：

```ts
interface ParserResult {
  props?: PropsResult[]
  events?: EventResult[]
  slots?: SlotResult[]
  methods?: MethodResult[]
  name?: string
  componentDesc?: CommentResult
}
```

## Props Result

```ts
interface PropsResult {
  type: PropType
  name: string
  typeDesc?: string[]
  required?: boolean
  default?: string
  defaultDesc?: string[]
  validator?: string
  validatorDesc?: string[]
  describe?: string[]
}
```

```ts
type PropType = string | string[] | null
```

## Events Result

```ts
interface EventResult {
  name: string
  isSync: boolean
  syncProp: string
  describe?: string[]
  argumentsDesc?: string[]
}
```

## Slots Result

```ts
interface SlotResult {
  name: string
  describe: string
  backerDesc: string
  bindings: AttrsMap
}
```

```ts
type AttrsMap = {
  [key: string]: string
}
```

## Methods Result

```ts
interface MethodResult {
  name: string
  describe?: string[]
  argumentsDesc?: string[]
}
```

## Comment Result

```ts
interface CommentResult {
  default: string[]
  [key: string]: string[]
}
```

## 注释的解析规则

在 [@vuese/cli 关于注释](/zh/cli/#关于注释) 一节中，我们谈到了部分关于注释的解析规则，接下来我们再做一些补充。`@vuese/parser` 在底层使用 [@babel/parser](https://babeljs.io/docs/en/babel-parser) 作为脚本的解析工具，按照位置分类，则一个节点的注释类型有两种：前置注释、后置注释，如果按照注释的类型分类，则可分为行注释和块注释。

以某一个节点的前置注释为例：

```js
methods: {
  /**
   * @vuese
   * Used to manually clear the form
   */
  // @arg The argument is a boolean value representing xxx
  clear (bol) {}
}
```

`clear` 函数拥有两个前置注释节点，并且其中一个注释节点是块注释，另一个是行注释。但无论是哪种注释，在 `@vuese/parser` 看来。它仅仅是 `3` 行文本：

```text
@vuese
Used to manually clear the form
@arg The argument is a boolean value representing xxx
```

`@vuese/parser` 会对其逐行解析：

- 第一行文本的内容为 `'@vuese'`，当 `@vuese/parser` 遇到以字符 `@` 开头的文本时，会将其作为注解，并收集紧跟在注解之后的内容内容。
  - 由于 `@vuese` 后面没有内容，所以会分配给他一个空数组，此时的解析结果如下：
  ```js
  {
    default: [],
    vuese: []
  }
  ```
- 接着开始解析第二行文本，由于第二行文本不包含注解，所以它会被当做默认注释内容，于是将它放到 `default` 数组中：

```js
{
  default: ['Used to manually clear the form'],
  vuese: []
}
```
- 最后解析第三行文本，由于它包含注解 `@arg`，所以最后的结果如下：

```js
{
  default: ['Used to manually clear the form'],
  vuese: [],
  arg: ['The argument is a boolean value representing xxx']
}
```

如果同一个节点拥有两个带有相同注解的注释节点，那么这两个注释节点的内容都会被收集，如下：

```js
methods: {
  // @arg The argument is a boolean value representing xxx
  // @arg The test
  clear (bol) {}
}
```

结果如下：

```js
{
  default: ['Used to manually clear the form'],
  vuese: [],
  arg: [
    'The argument is a boolean value representing xxx',
    'The test'
  ]
}
```

## 在线工具

我们提供了在线工具，如果你的项目中使用 `@vuese/parser`，它能更好的辅助你的开发：

* Site: [vuese-explorer](https://vuese.github.io/vuese-explorer/)
* Github: [https://github.com/vuese/vuese-explorer](https://github.com/vuese/vuese-explorer)

左边编写组件，右边查看解析结果:

![vuese explorer](@imgs/explorer.png)