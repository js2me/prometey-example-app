import _ from 'lodash'
import { Prometey } from './Prometey'
import { findTag } from './createTag'

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

const appendChilds = (childs, element) =>
  _.map(childs, child =>
    element.appendChild(
      child instanceof Element ? child : createElement.apply(null, child)
    )
  )

const appendProps = (props, element) =>
  _.forEach(props, (value, key) => {
    if (key === 'class') {
      element.className = typeof value === 'string' ? value : value.join(' ')
    } else if (key === 'childs') {
      appendChilds(value, element)
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

export const createElement = (query, props, connectors) => {
  if (_.isObject(query)) {
    const component = Prometey(query, props)
    return component.render()
  }
  let existingTag = findTag(query)
  if (existingTag) {
    return existingTag(props, connectors)
  }
  const { id, tag, classes, parent } = parseQuery(query)
  const element = document.createElement(tag)
  if (classes.length) {
    element.className = classes.join(' ')
  }
  if (id) {
    element.setAttribute('id', id)
  }
  if (_.isArray(props)) {
    appendChilds(props, element)
  } else if (_.isObject(props)) {
    appendProps(props, element)
  } else {
    appendString(props, element, tag)
  }
  if (parent) {
    const parentElement = document.querySelector(parent)
    if (!parentElement) throw Error(`Element by query "${parent}" is not found`)
    // setTimeout(() => {
    parentElement.appendChild(element)
    // })
  }
  return element
}
