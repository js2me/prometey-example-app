import { element, classes } from '../prometey'
import './index.css'

export default class Input {
  state = {
    placeholder: '',
    value: '',
    isDirty: false,
  }

  handleChangeInput = e => {
    this.state.value = e.target.value
    this.state.isDirty = true
  }

  render() {
    let { value, isDirty } = this.state

    return element('div', {
      className: classes('input-wrapper', {
        'is-empty': isDirty && !value,
        'is-dirty': isDirty,
      }),
      childs: [
        element('span.label', value),
        element('input', {
          input: this.handleChangeInput,
          placeholder: 'please enter something...',
          value,
        }),
      ],
    })
  }
}
