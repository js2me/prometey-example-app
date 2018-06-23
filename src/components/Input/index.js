import { element, classes } from '../../prometey'
import './index.css'

export default class Input {
  state = {
    placeholder: '',
    value: '',
    isDirty: false,
  }

  handleChangeInput = e => {
    this.state.value = e.target.value
    this.setIsDirty()
  }

  setIsDirty = () => {
    this.state.isDirty = true
  }

  render() {
    let { value, isDirty } = this.state
    const { placeholder } = this.props
    return element('div.input-wrapper', {
      class: classes('input-wrapper', {
        'is-empty': isDirty && !value,
        'is-dirty': isDirty,
      }),
      childs: [
        element('span.label', value),
        element('input', {
          input: this.handleChangeInput,
          blur: this.setIsDirty,
          placeholder,
          value,
        }),
      ],
    })
  }
}
