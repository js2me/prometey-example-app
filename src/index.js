import Prometey, { element } from 'prometey'
import Header from './components/Layout/Header'
import Content from './components/Layout/Content'
import './styles.css'

Prometey.connect(
  element('body->div.wrapper', [element(Header), element(Content)])
)
