import _ from 'lodash'
import { Prometey } from './Prometey'

const eventsList =
  '/cached/error/abort/load/beforeunload/unload/online/offline/focus/blur/open/message/error/close/pagehide/pageshow/popstate/animationstart/animationend/animationiteration/transitionstart/transitioncancel/transitionend/transitionrun/reset/submit/beforeprint/afterprint/compositionstart/compositionupdate/compositionend/fullscreenchange/fullscreenerror/resize/scroll/cut/copy/paste/keydown/keypress/keyup/mouseenter/mouseover/mousemove/mousedown/mouseup/auxclick/click/dblclick/contextmenu/wheel/mouseleave/mouseout/select/pointerlockchange/pointerlockerror/dragstart/drag/dragend/dragenter/dragover/dragleave/drop/durationchange/loadedmetadata/loadeddata/canplay/canplaythrough/ended/emptied/stalled/suspend/play/playing/pause/waiting/seeking/seeked/ratechange/timeupdate/volumechange/complete/audioprocess/loadstart/progress/error/timeout/abort/load/loadend/change/storage/checking/downloading/error/noupdate/obsolete/updateready/broadcast/CheckboxStateChange/hashchange/input/RadioStateChange/readystatechange/ValueChange/invalid/localized/message/message/message/open/show/'

export const parseQuery = queryString => {
  let [parent, query] = queryString.split('->')
  if (!query) {
    query = parent
    parent = null
  }
  const [element, ...classes] = query.split('.')
  const [tag, id] = element.split('#')
  return {
    classes,
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

const appendProps = (props, element) =>
  _.forEach(props, (value, key) => {
    if (key === 'class') {
      element.className = typeof value === 'string' ? value : value.join(' ')
    } else if (eventsList.includes(`/${key}/`)) {
      element.addEventListener(key, value)
    } else {
      if (!_.isUndefined(value)) {
        element.setAttribute(key, value)
      }
    }
  })

const appendString = (props, element, tag) => {
  if (!_.isUndefined(props)) {
    if (tag === 'input') {
      element.value = props
    } else if (tag === 'img') {
      element.src = props
    } else {
      element.innerText = props
    }
  }
}

const findElement = eId =>
  eId &&
  _.get(
    JSDOMTree,
    _.reduce(
      eId.split(''),
      (str, id, index) => {
        if (!index) {
          return `[${index}]`
        }
        return `childs[${index}]`
      },
      ''
    )
  )

const generateElId = (pId, id) => `${pId}${id}`

// element = { id, tag, classes, parent }
const attachElementToTree = (treeData, eId) => {
  const { tag, classes, id: elDOMid, childs, props, parent } = treeData
  const element = document.createElement(tag)
  if (classes.length) {
    element.className = classes.join(' ')
  }
  if (elDOMid) {
    element.setAttribute('id', elDOMid)
  }
  if (props) {
    if (_.isObject(props)) {
      appendProps(props, element)
    } else {
      appendString(props, element, tag)
    }
  }
  let treeEl = { ...treeData, element }
  if (!eId) {
    eId = `${JSDOMTree.push(treeEl) - 1}`
  }
  treeEl.eId = eId
  if (childs) {
    treeEl.childs = attachTree(childs, eId)
    _.forEach(treeEl.childs, child => treeEl.element.appendChild(child.element))
  }
  if (parent) {
    const pEl = document.querySelector(parent)
    if (!pEl) throw Error(`Element by query "${parent}" is not found`)
    pEl.appendChild(treeEl.element)
  }
  return treeEl
}

const updateElement = element => {}

let JSDOMTree = []

const aggregateTreeData = (treeData, id, pId) => {
  console.log('parentId', pId, 'elementId', id)
  const eId = pId && id && generateElId(pId, id)
  let findedEl = findElement(eId)
  let treeEl = null
  if (!findedEl) {
    treeEl = attachElementToTree(treeData, eId)
  } else {
    console.log('updateElement findedEl')
    treeEl = updateElement(findedEl)
  }
  return treeEl
}

export const attachTree = (treeData, pId) => {
  let data
  if (_.isArray(treeData)) {
    data = _.map(treeData, (element, id) =>
      aggregateTreeData(element, `${id}`, pId)
    )
  } else {
    data = [aggregateTreeData(treeData)]
  }
  console.log('JSDOMTREE', JSDOMTree, 'data', data)
  return data
}

export const createElement = (query, props) => {
  // query = 'section.footer', props = [create('span', 'End of page')]
  if (_.isObject(query)) {
    const component = Prometey(query, props)
    let componentTreeData = component.render()
    componentTreeData.isComponentTree = true
    // TODO Пробросить контекст через Prometey и склеить контекст с treeData
    // Это как вариант, потом просто обновлять как нибудь((
    return componentTreeData
  }

  let data = { ...parseQuery(query) }
  if (_.isArray(props)) {
    data.childs = [...props]
  } else if (_.isObject(props)) {
    const childs = _.pick(props, 'childs')
    if (childs && childs.length) {
      data.childs = childs
    }
    data.props = _.omit(props, 'childs')
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
