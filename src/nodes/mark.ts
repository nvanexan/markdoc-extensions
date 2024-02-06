import Markdoc from "@markdoc/markdoc";
import type { Config, Node } from "@markdoc/markdoc";

export const mark = {
  attributes: {
    content: { type: String, required: true },
  },
  transform(node: Node, config: Config) {
    const attributes = node.transformAttributes(config);
    const { content, ...rest } = attributes;
    return new Markdoc.Tag(`mark`, rest, [content]);
  },
};
