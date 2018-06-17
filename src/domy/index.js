import _ from 'lodash'

export { Element } from './Element'
export { Component } from './Component'

const elementCreator = str => {
  const [element, ...classes] = str.split('.')
  const [tag, id] = element.split('#')
  return {
    id,
    tag,
    classes,
  }
}

const PROP_TYPE_CLASSNAME = 'class name'
const PROP_TYPE_HANDLER = 'handler'

const RESERVED_PROP_WORDS = {
  classes: PROP_TYPE_CLASSNAME,
  click: PROP_TYPE_HANDLER,
  doubleclick: PROP_TYPE_HANDLER,
  mousedown: PROP_TYPE_HANDLER,
  mousemove: PROP_TYPE_HANDLER,
  mouseover: PROP_TYPE_HANDLER,
  touch: PROP_TYPE_HANDLER,
}

let domyStore = (() => {
  let counter = 0
  let store = {}

  const push = (id, tag, classes, element) => {
    if (element.DOMY_UID) {
      return element
    }
    const uid = counter++
    element.DOMY_UID = uid
    return (store[uid] = element)
  }

  return {
    push,
  }
})()

let counter = 0

const domy = (tagData, propsData, commonData, connectors) => {
  let id, tag, classes, element
  if (tags[tagData]) {
    return tags[tagData](propsData, commonData, connectors)
  }
  if (_.isString(tagData)) {
    const elementData = elementCreator(tagData)
    id = elementData.id
    tag = elementData.tag
    classes = elementData.classes
    element = document.createElement(tag)
    if (classes.length) {
      element.className = classes.join(' ')
    }
    if (id) {
      element.setAttribute('id', id)
    }
  }
  if (_.isArray(propsData)) {
    _.map(propsData, child => {
      console.log(child)
      element.appendChild(child)
    })
  } else if (_.isObject(propsData)) {
    _.forEach(propsData, (value, key) => {
      switch (RESERVED_PROP_WORDS[key]) {
        case PROP_TYPE_CLASSNAME:
          element.className = value.join(' ')
          break
        case PROP_TYPE_HANDLER:
          element.addEventListener(key, value)
          break
        default:
          element.setAttribute(key, value)
          break
      }
    })
  } else if (_.isString(propsData)) {
    if (tag === 'input') {
      element.value = propsData
    } else if (tag === 'img') {
      element.src = propsData
    } else {
      element.innerText = propsData
    }
  }
  if (classes.includes('domy-starter')) {
    document.querySelector('[domy]').appendChild(element)
  }
  return element
}

export default domy

let tags = {}

export const tag = (tagName, creator) => {
  tags[tagName] = creator
}
