import './polyfills/object.watch.js'
import { Prometey } from './Prometey'
import { createElement, createTree } from './element'
import { createTag } from './createTag'
import { createDOM, attachDOM } from './DOM'

export { classes } from './classes'
export { createElement } from './element'
export { createTag } from './createTag'

/* ---- short keywords ---- */
export const tag = createTag
export const create = createElement
export const elem = createElement
export const element = createElement
/* ---- short keywords ---- */

Prometey.connect = treeData => {
  const tree = createTree(treeData)
  console.log('connected', tree)
  const DOMTree = createDOM(tree)
  console.log('dom tree', DOMTree)
  attachDOM(DOMTree)
}

export default Prometey
