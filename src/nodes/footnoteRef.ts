import Markdoc from "@markdoc/markdoc";
import type { Config, Node } from "@markdoc/markdoc";

export const footnoteRef = {
  attributes: {
    id: { type: String, render: true, required: true },
    href: { type: String, render: true, required: true },
    label: { type: String, render: false, required: true },
  },
  transform(node: Node, config: Config) {
    const attributes = node.transformAttributes(config);
    const link = new Markdoc.Tag("a", attributes, [`${node.attributes.label}`]);
    return new Markdoc.Tag(`sup`, { class: "footnote-ref" }, [link]);
  },
};
