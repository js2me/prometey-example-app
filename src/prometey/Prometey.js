let uid = 0
export const Prometey = (Class, props) => {
  let context = new Class()
  context.props = props
  context.__proto__.PROMETEY_ID = uid++ //eslint-disable-line

  const rawRender = context.render.bind(context)
  context.render = () => rawRender()
  return context
}
