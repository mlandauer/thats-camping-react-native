import * as React from 'react'
import {
  Alert
} from 'react-native'

import About from '../components/About'

export default class AboutScreen extends React.Component<{},{}> {
  static navigatorStyle = {
    tabBarHidden: true
  }

  onOfflineMaps() {
    Alert.alert("onOfflineMaps")
  }

  render() {
    return (
      <About onOfflineMaps={() => this.onOfflineMaps()}/>
    )
  }
}
