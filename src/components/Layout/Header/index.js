import { element } from 'prometey'
import Button from '../../Button'
import './index.css'

export default class Header {
  state = {
    buttonClicked: false,
    clickedCount: 0,
  }

  onClick = () => {
    this.setState({
      buttonClicked: !this.state.buttonClicked,
      clickedCount: ++this.state.clickedCount,
    })
  }

  beforeRender() {
    console.log('aaa beforeRender(){')
  }

  render() {
    const { buttonClicked, clickedCount } = this.state

    return element('div.header', [
      element('div.logo', [
        element('span.logo', [
          element('h1', 'P'),
          element('div.title', 'rometey'),
        ]),
        element(
          'span.sub-message',
          clickedCount && `clicked count : ${clickedCount}`
        ),
      ]),
      element('div.actions', [
        buttonClicked && element('label.some-text', 'dynamic childs'),
        element(Button, {
          label: buttonClicked ? 'Clicked!!!' : 'Click me!',
          onClick: this.onClick,
          useClick: true,
        }),
      ]),
    ])
  }

  postRender() {
    console.log('aaa postRender(){')
  }
}
