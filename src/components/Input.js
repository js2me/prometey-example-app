import { element } from '../prometey'

export default class Input {
  state = {
    placeholder: '',
    value: '',
  }

  handleChangeInput = e => {
    this.state.value = e.target.value
  }

  render() {
    const { placeholder } = this.props
    let { value } = this.state

    console.log('Input render', this.state)

    return element('div.input-wrapper', [
      element('span.placeholder', placeholder),
      element('input.super-input', {
        input: this.handleChangeInput,
        value,
      }),
    ])
  }
}
