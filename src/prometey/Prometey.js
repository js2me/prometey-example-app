import _ from 'lodash'

let uid = 0
export const Prometey = (Class, props) => {
  let exemplar = new Class()
  exemplar.props = props
  exemplar.__proto__.PROMETEY_ID = uid++

  const stateCopy = _.cloneDeep(exemplar.state)
  let updaterTimer = null

  _.forEach(exemplar.state, (value, key) => {
    exemplar.state.__defineSetter__(key, value => {
      clearTimeout(updaterTimer)
      stateCopy[key] = value
      updaterTimer = setTimeout(() => {
        exemplar.render()
      })
    })
    exemplar.state.__defineGetter__(key, value => {
      return stateCopy[key]
    })
  })

  return exemplar
}
