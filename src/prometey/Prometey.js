import _ from 'lodash'
import { attachTree } from './createElement'

let uid = 0
export const Prometey = (Class, props) => {
  let context = new Class()
  context.props = props
  context.__proto__.PROMETEY_ID = uid++

  let updaterTimer = null

  _.forEach(context.state, (value, key) => {
    context.state.watch(key, () => {
      clearTimeout(updaterTimer)
      updaterTimer = setTimeout(() => {
        context.render()
      })
    })
  })

  const rawRender = context.render.bind(context)
  context.render = () => rawRender()
  return context
}
