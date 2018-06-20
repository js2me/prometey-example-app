import { tag, create, find } from './prometey'
import Input from './components/Input'
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
  create(Input, { placeholder: 'default placeholder' }),
  create('section.footer', [create('span', 'End of page')]),
])
