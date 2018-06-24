import { element } from '../../../prometey'

export default class Content {
  render() {
    return element('div.content', [
      element('h1', 'Some Title'),
      element('h2', 'Some Title'),
      element('h3', 'Some Title'),
      element('h4', 'Some Title'),
    ])
  }
}
