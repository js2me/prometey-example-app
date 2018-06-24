import _ from 'lodash'
import { classes } from './classes'
import { Prometey } from './Prometey'
import { getElementByEId } from './DOM'
import { updateElementByProps } from './props'

let JSDOMTree = []

export const parseQuery = (queryString, classNames) => {
  let [parent, query] = queryString.split('->')
  if (!query) {
    query = parent
    parent = null
  }
  const [element, ...className] = query.split('.')
  const [tag, id] = element.split('#')
  return {
    class: classes(className, classNames),
    id,
    parent,
    tag,
  }
}

const generateElId = (pId, id) => `${pId}${id}`

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

const removeExistChilds = (childs, anotherChilds) => {
  return _.reduce(
    childs,
    (arr, child) => {
      if (_.find(anotherChilds, aC => aC.eId !== child.eId).length) {
        arr.push(child)
      }
      return arr
    },
    []
  )
}

const updateElement = (oldTD, newTD) => {
  if (!oldTD) {
    console.log('sss')
  }
  const treeDOMel = getElementByEId(oldTD.eId)
  if (newTD.class !== oldTD.class) {
    treeDOMel.element.className = newTD.class
    oldTD.class = newTD.class
  }
  updateElementByProps(newTD.tag, treeDOMel.element, newTD, oldTD)
  if (newTD.childs) {
    const oldChildsCount = _.get(oldTD, 'childs.length')
    const newChildsCount = _.get(newTD, 'childs.length')
    if (oldChildsCount !== newChildsCount) {
      if (newChildsCount > oldChildsCount) {
        _.each(removeExistChilds(newTD.childs, oldTD.childs), child => {
          console.log('new child', child)
        })
      } else {
        _.each(removeExistChilds(oldTD.childs, newTD.childs), child => {
          console.log('remove child', child)
        })
      }
    }
    _.each(newTD.childs, (child, index) =>
      updateElement(oldTD.childs[index], child)
    )
  }
}

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
  if (_.isObject(query)) {
    const component = Prometey(query, props)
    let componentTreeData = component.render()
    componentTreeData.component = component
    return componentTreeData
  }

  let data = { ...parseQuery(query, _.get(props, 'class')) }
  if (_.isArray(props)) {
    data.childs = _.compact([...props])
  } else if (_.isObject(props)) {
    const childs = props.childs
    if (childs && childs.length) {
      data.childs = _.compact([...childs])
    }
    data.props = _.omit(props, ['childs', 'class'])
  } else {
    data.props = props
  }
  return data
}
