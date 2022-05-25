import { Node, Text } from '../rich-text-types';

export function isText(node: Node): node is Text {
  return (node as Text).text !== undefined;
}