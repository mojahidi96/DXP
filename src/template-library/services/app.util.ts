import {Injector} from "@angular/core";
import {ArrayNode, Node, ObjectNode, PrimitiveNode} from "@lumen/core-js";

let appInjectorRef: Injector;
export const appInjector = (injector?: Injector): Injector => {
  if (injector) {
    appInjectorRef = injector;
  }

  return appInjectorRef;
};


export function parseResponse(rootNode: Node, argument?: any) {
  let node = rootNode;
  let data = {};
  if (argument) {
    node = rootNode.findNode(argument);
  }

  if (node) {
    data = getObjectNode(node, data);
    return data;
  }

  return null;
}

function getObjectNode(node: Node, data: any) {
  if (node instanceof ObjectNode) {
    for (const n in node.children) {
      if (node.children[n] instanceof ObjectNode) {
        data[n] = {};
        getObjectNode(node.children[n], data[n]);
      } else if (node.children[n] instanceof PrimitiveNode) {
        data[n] = node.children[n].value;
      } else if (node.children[n] instanceof ArrayNode) {
        let arrayNode = node.children[n]['items'];
        if (arrayNode.length) {
          data[n] = [];
          for (const index in arrayNode) {
            data[n].push(parseArray(arrayNode[index]));
          }
        }
      }
    }
  }
  return data;
}

function parseArray(arrayNode: any, info: any = {}) {
  for (const n in arrayNode.children) {
    if (arrayNode.children[n] instanceof ObjectNode) {
      info[n] = {};
      parseArray(arrayNode.children[n], info[n]);
    } else if (arrayNode.children[n] instanceof ArrayNode) {
      let arr = arrayNode.children[n]['items'];
      if (arr.length) {
        info[n] = [];
        for (const index in arr) {
          info[n].push(parseArray(arr[index]));
        }
      }
    } else if (arrayNode.children[n] instanceof PrimitiveNode) {
      info[n] = arrayNode.children[n].value;
    }
  }
  return info;
}
