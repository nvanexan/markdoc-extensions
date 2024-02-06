# markdoc-extensions

A tiny library for extending Markdoc parsing.

Markdoc is amazing, but its parser does not parse some standard markdown tokens that one might wish to parse as Markdoc nodes, rather than as Markdoc tags. These include:

- Highlights (==some text==)
- Footnotes ([^1]: footnote)

This parser extends Markdoc's parser by processing these additional items, and exposing some extended nodes that you can add to your Markdoc config.

## How to use

1. Install the package

```
npm install --save @nvanexan/markdoc-extensions
```

2. Create a new instance of the extended parser

```ts
const parser = new MarkdocExtendedParser();
```

3. Pass in a string or Node object to be parsed

```ts
// Passing an existing ast Node already parsed by Markdoc's base parser
const result = parser.parse(ast);

// Passing a string of text
const result = parser.parse("This is a ==test==");
```

## Additional notes

When you initialize the extended parser, you may pass in arguments to have it ignore processing certain extended tokens. For example, if you want to ignore processing footnotes, you can initialize the parser like so:

```ts
const parser = new MarkdocExtendedParser({footnotes: false});
```

By default, both footnotes and highlights will be processed.

## Use cases

I am currently using this extended parser and nodes to apply highlights and footnotes in a project that uses Astro and Keystatic for content management. I will update with implementation details on that once the project is complete. 

