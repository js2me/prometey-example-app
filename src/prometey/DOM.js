import _ from 'lodash'
import { updateElementByProps } from './props'

let PROMETEY_DOM = []

export const attachToDOM = treeData => {
  const { tag, id: elDOMid, parent, props } = treeData

  const element = document.createElement(tag)
  if (treeData.class.length) {
    element.className = treeData.class
  }
  if (elDOMid) {
    element.setAttribute('id', elDOMid)
  }
  if (!_.isUndefined(props)) {
    updateElementByProps(tag, element, treeData)
  }

  if (parent) {
    const pEl = document.querySelector(parent)
    if (!pEl) throw Error(`Element by query "${parent}" is not found`)
    pEl.appendChild(element)
  }
  return element
}

export const createDOM = treeData =>
  treeData &&
  _.reduce(
    treeData,
    (tree, data) => {
      const element = attachToDOM(data)
      data = {
        childs: createDOM(data.childs),
        eId: data.eId,
        element,
      }
      _.forEach(data.childs, child => element.appendChild(child.element))
      tree.push(data)
      return tree
    },
    []
  )

export const parseElId = eId =>
  _.reduce(
    eId.split(''),
    (str, id, index) => str + (!index ? `[${index}]` : `childs[${id}]`),
    ''
  )

export const getElementByEId = eId => eId && _.get(PROMETEY_DOM, parseElId(eId))

export const attachDOM = dom => (PROMETEY_DOM = [...dom])
