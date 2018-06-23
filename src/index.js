import Prometey, { element } from './prometey'
// import Input from './components/Input'
import './styles.css'

Prometey.connect(
  element('#app->div.wrapper', [
    element('div.header', [
      element(
        'img.logo',
        'https://www.shareicon.net/data/512x512/2016/10/20/846441_alphabet-letter-letters-p-red_512x512.png'
      ),
      element('div.title', 'Prometey'),
    ]),
    element('div.content.pages', [
      element('div.page.main-page'),
      element('div.page.second-page'),
      element('div.page.third-page'),
      element('div.page.fourth-page'),
      element('div.page.fifth-page'),
      element('div.page.sixth-page'),
      // element(Input, { placeholder: 'default placeholder' }),
    ]),
  ])
)
