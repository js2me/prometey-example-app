let tags = {}

export const createTag = (tagName, creator) => {
  tags[tagName] = creator
}

export const findTag = tagName => tags[tagName]
