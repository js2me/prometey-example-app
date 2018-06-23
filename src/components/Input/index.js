import { element, classes } from '../../prometey'
import './index.css'

export default class Input {
  state = {
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
    const { placeholder, label } = this.props
    return element('div.input-wrapper', {
      class: classes('input-wrapper', {
        'is-empty': isDirty && !value,
        'is-dirty': isDirty,
      }),
      childs: [
        label && element('span.label', label),
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
