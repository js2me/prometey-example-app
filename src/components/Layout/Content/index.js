import { element } from 'prometey'
import _ from 'lodash'
import Tabs from '../Tabs'

export default class Content {
  tabs = {
    about: element(
      'label',
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,'
    ),
    faq: element(
      'label',
      `Nullam egestas habitasse adipiscing adipiscing class accumsan. Nunc quis risus tellus integer odio. Ante urna nam sapien vitae porta facilisis fermentum nibh at aliquam curae; torquent interdum.

      Lorem felis at suscipit viverra magnis cubilia sociis. Cum potenti posuere laoreet taciti iaculis amet vestibulum tempus Varius fames eros in orci class risus morbi Tellus dictum bibendum varius aptent feugiat ad, eros tellus egestas cursus commodo.
      
      Dis. Montes rhoncus nibh per, porta morbi mus ullamcorper scelerisque aenean, nisl platea, habitant ullamcorper. Euismod cursus, in gravida. Lacinia donec. Pretium. Vehicula facilisis consectetuer ullamcorper eget. Donec justo risus torquent quam imperdiet, quisque ridiculus per.`
    ),
    book: element(
      'label',
      `Sollicitudin. Enim pharetra, erat mus dictumst netus eu quis volutpat vivamus bibendum dolor urna tincidunt leo tortor netus rutrum diam, dolor laoreet per amet etiam nec pretium sit pulvinar amet. Penatibus facilisis consequat lacinia consectetuer platea Fermentum felis.

    Quam. Taciti semper pretium dictumst suscipit id. Eros, vitae morbi porta augue egestas volutpat commodo. Fusce iaculis viverra ad pellentesque. Porta.
    
    Metus eleifend. Ipsum sit nisi, interdum sociis per in a tempor. Potenti dis inceptos semper dictum pretium quam taciti purus tristique. Est ultricies lorem nonummy donec eget sem posuere metus rhoncus ultrices rhoncus varius. Platea, purus convallis condimentum tempor duis ridiculus.`
    ),
  }
  state = {
    counter: 0,
    activeTab: 'about',
  }

  handleSwitchTab = activeTab => this.setState({ activeTab })

  render() {
    const { activeTab } = this.state
    return element('div.content', [
      element(Tabs, {
        tabs: _.keys(this.tabs),
        activeTab,
        onSwitch: this.handleSwitchTab,
      }),
      element('div.tab-content', [
        element('h1', _.startCase(activeTab)),
        this.tabs[activeTab],
      ]),
    ])
  }
}
