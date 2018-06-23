import _ from 'lodash'
import { classes } from './classes'
import { Prometey } from './Prometey'
import { getElementByEId } from './DOM'

export const parseQuery = (queryString, classNames) => {
  let [parent, query] = queryString.split('->')
  if (!query) {
    query = parent
    parent = null
  }
  const [element, ...className] = query.split('.')
  const [tag, id] = element.split('#')
  return {
    className: classes(className, classNames),
    id,
    parent,
    tag,
  }
}

// const appendChilds = (childs, element) =>
//   _.map(childs, child =>
//     element.appendChild(
//       child instanceof Element ? child : createElement.apply(null, child)
//     )
//   )

const generateElId = (pId, id) => `${pId}${id}`

// element = { id, tag, classes, parent }
const attachElementToTree = (treeData, eId) => {
  let treeEl = { ...treeData }
  if (!eId) {
    eId = `${JSDOMTree.push(treeEl) - 1}`
  }
  treeEl.eId = eId
  if (treeData.childs) {
    treeEl.childs = createTree(treeData.childs, eId)
  }
  return treeEl
}

const updateElement = (oldTD, newTD) => {
  if (newTD.className !== oldTD.className) {
    const treeDOMel = getElementByEId(oldTD.eId)
    treeDOMel.element.className = newTD.className
  }
}

let JSDOMTree = []

const aggregateTreeData = (treeData, id, pId) => {
  const eId = pId && id && generateElId(pId, id)
  const treeEl = attachElementToTree(treeData, eId)
  if (treeEl.component) {
    let updaterTimer = null
    _.forEach(treeEl.component.state, (value, key) => {
      treeEl.component.state.watch(key, (key, value) => {
        if (updaterTimer !== null) {
          clearTimeout(updaterTimer)
        }
        updaterTimer = setTimeout(() => {
          updaterTimer = null
          updateElement(treeEl, treeEl.component.render())
        }, 0)
      })
    })
  }
  return treeEl
}

export const createTree = (treeData, pId) => {
  let data
  if (_.isArray(treeData)) {
    data = _.map(treeData, (element, id) =>
      aggregateTreeData(element, `${id}`, pId)
    )
  } else {
    data = [aggregateTreeData(treeData)]
  }
  return data
}

export const createElement = (query, props) => {
  // query = 'section.footer', props = [create('span', 'End of page')]
  if (_.isObject(query)) {
    const component = Prometey(query, props)
    let componentTreeData = component.render()
    componentTreeData.component = component
    // TODO Пробросить контекст через Prometey и склеить контекст с treeData
    // Это как вариант, потом просто обновлять как нибудь((
    return componentTreeData
  }

  let data = { ...parseQuery(query, _.get(props, 'className')) }
  if (_.isArray(props)) {
    data.childs = [...props]
  } else if (_.isObject(props)) {
    const childs = props.childs
    if (childs && childs.length) {
      data.childs = [...childs]
    }
    data.props = _.omit(props, ['childs', 'className'])
  } else {
    data.props = props
  }
  return data
  // const element = document.createElement(tag)
  // if (classes.length) {
  //   element.className = classes.join(' ')
  // }
  // if (id) {
  //   element.setAttribute('id', id)
  // }

  // return () => generateElement(query, props, connectors)
  // if (_.isObject(query)) {
  //   const component = Prometey(query, props)
  //   return component.render()
  // }
  // let existingTag = findTag(query)
  // if (existingTag) {
  //   return existingTag(props, connectors)
  // }
  // const { id, tag, classes, parent } = parseQuery(query)
  // const element = document.createElement(tag)
  // if (classes.length) {
  //   element.className = classes.join(' ')
  // }
  // if (id) {
  //   element.setAttribute('id', id)
  // }
  // if (_.isArray(props)) {
  //   appendChilds(props, element)
  // } else if (_.isObject(props)) {
  //   appendProps(props, element)
  // } else {
  //   appendString(props, element, tag)
  // }
  // if (parent) {
  //   const parentElement = document.querySelector(parent)
  //   if (!parentElement) throw Error(`Element by query "${parent}" is not found`)
  //   // setTimeout(() => {
  //   parentElement.appendChild(element)
  //   // })
  // }
  // return element
}
