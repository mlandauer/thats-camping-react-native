import * as React from 'react'
import { View, Text } from 'react-native'

import CampsiteMap from '../components/CampsiteMap'

export default class MapScreen extends React.Component<{},{}> {
  // Duplicated from CampsiteIndexScreen
  // TODO: refactor
  static navigatorStyle = {
    navBarBackgroundColor: '#97b13d',
    navBarTextColor: '#fff',
    navBarButtonColor: '#fff',
    statusBarTextColorScheme: 'light',
    navBarTextFontSize: 22,
    navBarButtonFontSize: 22
  }

  render() {
    return (
      <CampsiteMap />
    )
  }
}
