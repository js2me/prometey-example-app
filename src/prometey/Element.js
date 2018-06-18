const elementCreator = str => {
  const [element, ...classes] = str.split('.')
  const [tag, id] = element.split('#')
  return {
    id,
    tag,
    classes,
  }
}

const collectAttributes = (element, attributes) => {
  const attrKeys = Object.keys(attributes)
  for (let x = 0; x < attrKeys; x++) {
    let key = attrKeys[x]
    element[HANDLER_KEYS[key] ? 'addEventListener' : 'setAttribute'](
      key,
      attributes[key]
    )
  }
}

const HANDLER_KEYS = {
  click: true,
  blur: true,
}

export class Element {
  childs = []
  classes = []
  connecters = []
  element = null
  id = ''
  tag = ''

  constructor(str, attributes, childs, connecters) {
    if (typeof str === 'string') {
      const { id, tag, classes } = elementCreator(str)
      this.id = id
      this.tag = tag
      this.classes = classes
      this.element = document.createElement(tag)
      if (classes.length) {
        this.element.className = classes.join(' ')
      }
      if (id) {
        this.element.setAttribute('id', id)
      }
    }

    if (attributes instanceof Array) {
      connecters = childs
      childs = attributes
    } else if (typeof attributes === 'object') {
      collectAttributes(this.element, attributes)
    } else {
      this.element.innerText = attributes
    }
    if (childs instanceof Array) {
      this.childs = childs.map(this.constructor.apply)
    } else if (childs !== null && childs !== undefined) {
      this.element.innerText = childs
    } else {
      this.element.innerText = ''
    }
    this.connecters = connecters.map(connecter => connecter(this.element))
  }
}
