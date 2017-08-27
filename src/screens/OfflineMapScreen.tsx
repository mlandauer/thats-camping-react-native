import * as React from 'react'
import {
  Text,
} from 'react-native'

export default class OfflineMapScreen extends React.Component<{}, {}> {
  static navigatorStyle = {
    tabBarHidden: true
  }

  render() {
    return (
      <Text>Hello! This is the OfflineMapScreen</Text>
    )
  }
}
