import Prometey, { tag, create, Component } from './prometey'
import './styles.css'

const logoSrc =
  'http://www.dumpaday.com/wp-content/uploads/2018/06/00-94-620x280.jpg'

tag('app-header', title =>
  create('div.header', [
    create('img.logo', logoSrc),
    create('div.title', title),
  ])
)

tag('super-input', (value, placeholder) => {
  return create('div.input-wrapper', [
    create('span.placeholder', placeholder),
    create('input.super-input', {
      input: () => console.log('it is changed'),
      value,
    }),
  ])
})

create('#app->div.wrapper', [
  ['app-header', 'Just Dogs'],
  create('section.content', [create('div', [create('super-input')])]),
  create('section.footer', [create('span', 'End of page')]),
])

class LolPrikol extends Component {
  constructor() {
    super()
    console.log('LolPrikol constructor')
  }

  render() {
    console.log('LolPrikol render')
    return 'MMM'
  }
}

const lol = new LolPrikol()
lol.render()
