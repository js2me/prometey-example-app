import Prometey, { tag, element, find } from './prometey'
import Input from './components/Input'
import './styles.css'

const logoSrc =
  'http://www.dumpaday.com/wp-content/uploads/2018/06/00-94-620x280.jpg'

// tag('super-input', (value, placeholder) => {
//   return create('div.input-wrapper', [
//     create('span.placeholder', placeholder),
//     create('input.super-input', {
//       input: () => console.log('it is changed'),
//       value,
//     }),
//   ])
// })

Prometey.connect(
  element('#app->div.wrapper', [
    element('div.header', [
      element('img.logo', logoSrc),
      element('div.title', 'Dogs'),
    ]),
    element(Input, { placeholder: 'default placeholder' }),
    element('section.footer', [element('span', 'End of page')]),
  ])
)
