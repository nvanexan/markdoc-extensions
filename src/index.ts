import { footnoteItem } from "./nodes/footnoteItem";
import { footnoteRef } from "./nodes/footnoteRef";
import { mark } from "./nodes/mark";
import { MarkdocExtendedParser } from "./parser";

export const extendedNodes = {
  footnoteItem,
  footnoteRef,
  mark,
};

export default MarkdocExtendedParser;
