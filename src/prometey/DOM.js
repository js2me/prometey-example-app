import _ from 'lodash'

let PROMETEY_DOM = []

const EVENTS_LIST =
  '/cached/error/abort/load/beforeunload/unload/online/offline/focus/blur/open/' +
  'message/error/close/pagehide/pageshow/popstate/animationstart/animationend/' +
  'animationiteration/transitionstart/transitioncancel/transitionend/transitionrun/' +
  'reset/submit/beforeprint/afterprint/compositionstart/compositionupdate/compositionend/' +
  'fullscreenchange/fullscreenerror/resize/scroll/cut/copy/paste/keydown/keypress/keyup/mouseenter/' +
  'mouseover/mousemove/mousedown/mouseup/auxclick/click/dblclick/contextmenu/wheel/mouseleave/mouseout/' +
  'select/pointerlockchange/pointerlockerror/dragstart/drag/dragend/dragenter/dragover/dragleave/drop/' +
  'durationchange/loadedmetadata/loadeddata/canplay/canplaythrough/ended/emptied/stalled/suspend/play/' +
  'playing/pause/waiting/seeking/seeked/ratechange/timeupdate/volumechange/complete/audioprocess/loadstart/' +
  'progress/error/timeout/abort/load/loadend/change/storage/checking/downloading/error/noupdate/obsolete/' +
  'updateready/broadcast/CheckboxStateChange/hashchange/input/RadioStateChange/readystatechange/ValueChange/' +
  'invalid/localized/message/message/message/open/show/'

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
    if (_.isObject(props)) {
      _.forEach(props, (value, key) => {
        if (EVENTS_LIST.includes(`/${key}/`)) {
          element.addEventListener(key, value)
        } else {
          if (!_.isUndefined(value) && key !== 'class') {
            element.setAttribute(key, value)
          }
        }
      })
    } else {
      if (tag === 'input' || tag === 'textarea') {
        element.value = props
      } else if (tag === 'img') {
        element.src = props
      } else {
        element.innerText = props
      }
    }
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
  console.log('eId', eId) ||
  _.reduce(
    eId.split(''),
    (str, id, index) => str + (!index ? `[${index}]` : `childs[${id}]`),
    ''
  )

export const getElementByEId = eId => eId && _.get(PROMETEY_DOM, parseElId(eId))

export const attachDOM = dom => (PROMETEY_DOM = [...dom])
