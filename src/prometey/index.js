import './object.watch.js'
import { Prometey } from './Prometey'
import { createElement, attachTree } from './createElement'
import { createTag } from './createTag'

export { createElement } from './createElement'
export { createTag } from './createTag'
export { Element } from './Element'
export { Component } from './Component'

/* ---- short keywords ---- */
export const tag = createTag
export const create = createElement
export const elem = createElement
export const element = createElement
/* ---- short keywords ---- */

Prometey.connect = attachTree

export default Prometey
