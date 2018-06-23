import { element } from '../../prometey'
// import './index.css'

export default class PageTitle {
  render() {
    const { title, description } = this.props

    return element('div.page-title', {
      childs: [element('h1', title), description && element('h2', description)],
    })
  }
}
