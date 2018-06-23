import _ from 'lodash'

export const classes = (...classes) => {
  let classNames = []
  classes.forEach(value => {
    if (_.isString(value)) {
      classNames.push(value)
    } else if (_.isArray(value)) {
      classNames.push.apply(classNames, value)
    } else if (_.isObject(value)) {
      _.forEach(value, (val, className) => {
        if (val) {
          classNames.push(className)
        }
      })
    }
  })

  return _.uniq(classNames).join(' ')
}
