# @vuese/parser

The `vue` SFC parser, parses the contents of the `vue` file and returns the parsing result.

## Basic use

### Installation

```sh
yarn add @vuese/parser
```

### Usage

```js
// Import parser function
import { parser } from '@vuese/parser'

// Read vue file content
const source = fs.readFileSync('path-to-your-component.vue', 'utf-8')

// Parse and get the result using the parser function
try {
  const parserRes = parser(source)
} catch(e) {
  console.error(e)
}
```

### parser function

The types of the `parser` function are as follows:

```ts
(source: string, options?: ParserOptions): ParserResult
```

The `parser` function takes two arguments, the first argument is the contents of the `vue` source file, the second argument is the optional parsing option, and the return value is the result of the parsing.

### ParserOptions

The parsing option provides a series of hooks. You can choose to abandon the default parsing result of the `parser` function and customize the requirements through the hook option. The types of parsing options are as follows:

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
  onComputed?: {
    (computedRes: ComputedResult): void
  }
  onMixIn?: {
    (mixInRes: MixInResult): void
  }
  onData?: {
    (dataRes: DataResult): void
  }
  onSlot?: {
    (slotRes: SlotResult): void
  }
  onName?: {
    (name: string): void
  }
  onDesc?: {
    (desc: CommentResult): void
  }
  onWatch?: {
    (watch: WatchResult): void
  }
  babelParserPlugins?: BabelParserPlugins
}
```

#### onProp

* Type: `(propsRes: PropsResult): void`

Triggered when the parser encounters `prop`, the argument is the result of `prop` being processed, see: [PropsResult](#props-result).

#### onEvent

* Type: `(eventRes: EventResult): void`

Triggered when the parser encounters an event, the argument is the result of the event being processed, see: [EventResult](#events-result).

#### onMethod

* Type: `(methodRes: MethodResult): void`

Triggered when the parser encounters a method, the argument is the result of the method being processed, see: [MethodResult](#methods-result).

#### onSlot

* Type: `(slotRes: SlotResult): void`

Triggered when the parser encounters a slot, the argument is the result of the slot being processed, see: [SlotResult](#slots-result).

#### onMixIn <Badge text="2.1.0+"/>

* Type: `(mixInRes: MixInResult): void`

Triggered when the parser encounters the `mixins` option, the argument is the result of `mixins` being processed, see: [Mixinresult](#mixin-result)

#### onName

* Type: `(name: string): void`

Triggered when the parser encounters the component's `name` option, the argument is the value of the `name` option.

#### onDesc

* Type: `(desc: CommentResult): void`

Triggered when the parser encounters a comment node that describes the component. The parameter is the comment information after processing. see: [CommentResult](#comment-result)]

#### onComputed <Badge text="2.3.0+"/>

* Type: `(computedRes: ComputedResult): void`

Triggered when the parser encounters a computed property, the argument is the result of the computed property being processed, see:[ComputedResult](#computed-result)

#### onData <Badge text="2.3.0+"/>

* Type: `(dataRes: DataResult): void`

Triggered when the parser encounters the `data` option, the argument is the result of `data` being processed, see:[DataResult](#data-result)

#### onWatch <Badge text="2.3.0+"/>

* Type: `(watch: WatchResult): void`

Triggered when the parser encounters the `watch` option, the argument is the result of the `watch` being processed, see:[WatchResult](#watch-result)

#### babelParserPlugins

* Type: `ParserPlugin[]`

```js
export type BabelParserPlugins = { [key in ParserPlugin]?: boolean }
```

Used to specify a list of plugins for `babel parser`, all of which can be viewed: [https://babeljs.io/docs/en/babel-parser#plugins](https://babeljs.io/docs/en/babel-Parser#plugins)

::: tip
The babel plugin is different from the babel parser plugin.
:::

### ParserResult

By default, the parser uses the built-in parsing options to generate parsing results, type is as follows:

```ts
interface ParserResult {
  props?: PropsResult[]
  events?: EventResult[]
  slots?: SlotResult[]
  mixIns?: MixInResult[]
  methods?: MethodResult[]
  name?: string
  componentDesc?: CommentResult
}
```

::: warning
`mixIns` is only supported in the `2.1.0+` version
:::

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

## MixIn Result <Badge text="2.1.0+"/>

```ts
export interface MixInResult {
  mixIn: string
}
```

## Computed Result <Badge text="2.3.0+"/>

```ts
export interface ComputedResult {
  name: string
  type?: string[]
  describe?: string[]
  isFromStore: boolean
}
```

## Data Result <Badge text="2.3.0+"/>

```ts
export interface DataResult {
  name: string
  type: string
  describe?: string[]
  default?: string
}
```

## Watch Result <Badge text="2.3.0+"/>

```ts
export interface WatchResult {
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

## Rules for parsing comments

In the [@vuese/cli About comments](/cli/#about-comments) section, we talked about some of the rules for parsing comments, and then we will add a little. `@vuese/parser` Use [@babel/parser](https://babeljs.io/docs/en/babel-parser) as the underlying parsing tool for script. Classified by location, there are two types of comments for a node: the leading comment and the tailing comment. If classified according to the type of comments, it can be divided into line comments and block comments.

Take the leading comment of a node as an example:

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

The `clear` function has two leading comment nodes, and one of the comment nodes is a block comment and the other is a line comment. But no matter what kind of comment, for `@vuese/parser`, it's just `3` line text:

```text
@vuese
Used to manually clear the form
@arg The argument is a boolean value representing xxx
```

`@vuese/parser` will parse it line by line:

- The content of the first line of text is `'@vuese'`. When `@vuese/parser` encounters text beginning with the character `@`, it will be treated as an annotation and the content immediately following the annotation will be collected.
  - Since there is no content after `@vuese`, an empty array will be assigned to it. The parse result is as follows:

  ```js
  {
    default: [],
    vuese: []
  }
  ```

- Then start parsing the second line of text. Since the second line of text does not contain annotations, it will be treated as the default comment content, so put it in the `default` array:

```js
{
  default: ['Used to manually clear the form'],
  vuese: []
}
```

- Finally parsing the third line of text, since it contains the annotation `@arg`, the final result is as follows:

```js
{
  default: ['Used to manually clear the form'],
  vuese: [],
  arg: ['The argument is a boolean value representing xxx']
}
```

If the same node has two comment nodes with the same annotation, the contents of both comment nodes are collected, as follows:

```js
methods: {
  // @arg The argument is a boolean value representing xxx
  // @arg The test
  clear (bol) {}
}
```

The results are as follows:

```js {5,6}
{
  default: ['Used to manually clear the form'],
  vuese: [],
  arg: [
    'The argument is a boolean value representing xxx',
    'The test'
  ]
}
```

## Online Tools

We provide online tools, if you use `@vuese/parser` in your project, it can better assist your development:

* Site: [vuese-explorer](https://vuese.github.io/vuese-explorer/)
* Github: [https://github.com/vuese/vuese-explorer](https://github.com/vuese/vuese-explorer)

Write the component on the left and view the parse result on the right:

![vuese explorer](@imgs/explorer.png)