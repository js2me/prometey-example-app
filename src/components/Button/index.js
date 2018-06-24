import { element } from '../../prometey'

export default class Button {
  render() {
    const { label, onClick } = this.props
    return element('button.some-button', {
      value: label,
      click: () => {
        console.log('clicked!')
        onClick()
      },
    })
  }
}
