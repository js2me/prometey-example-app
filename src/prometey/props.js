import _ from 'lodash'

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

const getOnlyNewProps = (newProps, prevProps) =>
  prevProps
    ? _.reduce(
        newProps,
        (obj, value, key) => {
          if (_.isUndefined(prevProps[key]) || _.isNull(prevProps[key])) {
            obj[key] = value
          }
          return obj
        },
        {}
      )
    : newProps

const addPropsToElement = (element, props) =>
  _.each(props, (prop, propName) => {
    if (propIsEvent(propName)) {
      element.addEventListener(propName, prop)
    } else {
      if (!_.isUndefined(prop)) {
        if (propName === 'value') {
          element.innerText = prop
        } else {
          element.setAttribute(propName, prop)
        }
      }
    }
  })

const propIsEvent = propName => EVENTS_LIST.includes(`/${propName}/`)

const removePropFromElement = (element, prop, name) =>
  propIsEvent(name)
    ? element.removeEventListener(name, prop)
    : name === 'value'
      ? (element.innerText = '')
      : element.removeAttribute(name)

export const updateElementByProps = (tag, element, newTD, oldTD) => {
  let newProps = newTD.props
  let prevProps = oldTD && oldTD.props

  if (_.isObject(newProps)) {
    if (_.isEmpty(newProps) && _.isEmpty(prevProps)) {
      return
    }
    addPropsToElement(element, getOnlyNewProps(newProps, prevProps))
    _.each(prevProps, (prevPropValue, propName) => {
      const newPropValue = newProps[propName]
      if (_.isUndefined(newPropValue) || _.isNull(newPropValue)) {
        prevProps[propName] = removePropFromElement(
          element,
          prevPropValue,
          propName
        )
      } else {
        if (!propIsEvent(propName) && newPropValue !== prevPropValue) {
          if (propName === 'value') {
            prevProps[propName] = element.innerText = newPropValue
          } else {
            element.setAttribute(propName, newPropValue)
            prevProps[propName] = newPropValue
          }
        }
      }
    })
  } else {
    if (_.isUndefined(newProps) || _.isNull(newProps) || !newProps.length) {
      if (tag === 'input' || tag === 'textarea') {
        element.value = ''
      } else if (tag === 'img') {
        element.src = ''
      } else {
        element.innerText = ''
      }
      if (oldTD) {
        oldTD.props = ''
      }
    } else if (newProps !== prevProps) {
      if (tag === 'input' || tag === 'textarea') {
        element.value = newProps
      } else if (tag === 'img') {
        element.src = newProps
      } else {
        element.innerText = newProps
      }
      if (oldTD) {
        oldTD.props = newProps
      }
    }
  }
}
