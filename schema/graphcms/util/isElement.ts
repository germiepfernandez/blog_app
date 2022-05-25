import { ElementNode, Node } from '../rich-text-types';

export function isElement(node: Node): node is ElementNode {
  return (node as ElementNode).children !== undefined;
}