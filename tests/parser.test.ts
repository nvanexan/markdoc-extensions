import Markdoc, { ConfigType, nodes } from "@markdoc/markdoc";
import MarkdocExtendedParser, { extendedNodes } from "../src";

const config = {
  nodes: { ...nodes, ...extendedNodes },
} as ConfigType;

test("parses highlights correctly", () => {
  const ast = convert("This is a ==test==");
  expect(ast).toMatchSnapshot();

  const content = Markdoc.transform(ast, config);
  const rendered = Markdoc.renderers.html(content);
  expect(rendered).toMatchSnapshot();
});

test("parses footnotes correctly", () => {
  const ast = convert(`
  This is a paragraph with a footnote.[^1]
  
  [^1]: this is the footnote
  `);
  expect(ast).toMatchSnapshot();

  const content = Markdoc.transform(ast, config);
  const rendered = Markdoc.renderers.html(content);
  expect(rendered).toMatchSnapshot();
  expect(rendered).toContain(
    '<sup class="footnote-ref"><a id="fnref1" href="#fn1">1</a></sup>'
  );
});

test("parses multiple footnotes correctly", () => {
  const ast = convert(`
  This is a paragraph with a footnote.[^1]

  This is a paragraph with a second footnote.[^2]

  This is a paragraph with a third footnote.[^3]
  
  [^1]: this is the footnote

  [^2]: this is the second footnote
  
  [^3]: this is the third footnote
  `);
  expect(ast).toMatchSnapshot();

  const content = Markdoc.transform(ast, config);
  const rendered = Markdoc.renderers.html(content);
  expect(rendered).toMatchSnapshot();
  expect(rendered).toContain('id="fn3"');
});

test("parses multiple complex footnotes correctly", () => {
  const ast = convert(`
  This is a paragraph with a footnote.[^1]

  This is a paragraph with a second footnote.[^2]

  This is a paragraph with a third footnote.[^3]
  
  [^1]: Unlike [MDX](https://mdxjs.com/), you don't embed code or react components. It's more like the [Liquid template language](https://shopify.github.io/liquid/) developed by Shopify.

  [^2]: Note that you're not just confined to rendering semantic HTML tags. You can also render custom elements that correspond to your [web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components). And that's awesome. Because you can basically at that point get the benefit of both Markdown for content authoring and interactive richness that comes with web components and the built in shadow dom. 
  
  [^3]: The folks at Stripe who are maintaing Markdoc are quite responsive. Shoutout to them, and hat tip to the company for open sourcing this.
  `);
  expect(ast).toMatchSnapshot();

  const content = Markdoc.transform(ast, config);
  const rendered = Markdoc.renderers.html(content);
  expect(rendered).toMatchSnapshot();
  expect(rendered).toContain('id="fn3"');
});

function convert(example: string) {
  const parser = new MarkdocExtendedParser({
    highlights: true,
    footnotes: true,
  });
  return parser.parse(example);
}
