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

function convert(example: string) {
  const parser = new MarkdocExtendedParser({
    highlights: true,
    footnotes: true,
  });
  return parser.parse(example);
}
