import { element } from 'prometey'
import _ from 'lodash'

export default class Tabs {
  render() {
    const { tabs, activeTab, onSwitch } = this.props
    return element(
      'div.tabs',
      _.map(tabs, tab =>
        element('div.tab', {
          value: tab,
          onMouseDown: () => onSwitch(tab),
          class: activeTab === tab && 'active',
        })
      )
    )
  }
}

// tabs: _.keys(this.tabs),
// activeTab,
// onSwitch: this.handleSwitchTab,
