import Markdoc from "@markdoc/markdoc";
import type { Config, Node } from "@markdoc/markdoc";

export const footnoteItem = {
  attributes: {
    id: { type: String, render: true, required: true },
    href: { type: String, render: false, required: true },
  },
  transform(node: Node, config: Config) {
    node.attributes.class = `footnote-item`;
    const anchor = new Markdoc.Ast.Node(
      "link",
      { class: "footnote-anchor", href: node.attributes.href },
      [new Markdoc.Ast.Node("text", { content: "↩" })]
    );
    node.push(anchor);
    return new Markdoc.Tag(
      "li",
      node.transformAttributes(config),
      node.transformChildren(config)
    );
  },
};
