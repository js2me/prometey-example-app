import domy, { tag } from './domy'

const logoSrc =
  'http://www.dumpaday.com/wp-content/uploads/2018/06/00-94-620x280.jpg'

tag('app-header', title =>
  domy('div.header', [domy('img.logo', logoSrc), domy('div.title', title)])
)

tag('super-input', (value, placeholder) => {
  return domy('div.input-wrapper', [
    domy('span.placeholder', placeholder),
    domy('input.super-input', value),
  ])
})

var dataObject = {
  input: 'input text',
}

domy('div.wrapper.domy-starter', [
  domy('app-header', 'App Title'),
  domy('super-input', dataObject.input, 'my super input'),
  domy('section.content', [domy('div')]),
  domy('section.footer', [domy('span', 'it is footer')]),
])
// class GreenButton extends Component {
//   $title = 'Title!'
//   $text = 'Click me!'

//   handleClick(e) {
//     e.preventDefault()
//   }

//   render() {
//     return [
//       [
//         'div.button-wrapper',
//         [
//           ['span.title', this.$title],
//           ['button.green-button', { click: this.handleClick }, this.$text],
//         ],
//       ],
//     ]
//   }
// }

// class Content extends Component {
//   render() {
//     return [
//       'div.content',
//       [
//         GreenButton({
//           classes: 'append-button',
//           click: () => console.log('lol'),
//         }),
//       ],
//     ]
//   }
// }

// const element = () => {}

// const Header = attrs => [
//   'div.header',
//   { mouseover: () => console.log('mouse over') },
//   [
//     [
//       'div.logo',
//       element('img.app-logo', {
//         src:
//           'https://vignette.wikia.nocookie.net/superman/images/b/b4/Nightwing-flamebird-yinyang.png/revision/latest/scale-to-width-down/288?cb=20110428033943',
//       }),
//     ],
//   ],
// ]
// // const Header = new SimpleComponent(['div.header', 'App Title'])
// // const Footer = new SimpleComponent([['div.footer', ['span', 'it is a footer']]])

// connectVanillin(['div.wrapper', [Header(), Content(), Footer()]])

// var lol = {
//   element: 'div.wrapper',
//   childs: [
//     { element: 'div.header' },
//     { element: 'div.content' },
//     { element: 'div.footer' },
//   ],
// }
