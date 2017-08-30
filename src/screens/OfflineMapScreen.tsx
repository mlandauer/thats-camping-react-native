import * as React from 'react'
import { Alert } from 'react-native'

import OfflineMapControls from '../components/OfflineMapControls'

export default class OfflineMapScreen extends React.Component<{}, {}> {
  static navigatorStyle = {
    tabBarHidden: true
  }

  onDownloadingChange(_downloading: boolean) {
    Alert.alert("changed")
  }

  render() {
    return (
      <OfflineMapControls
        downloading={true}
        onDownloadingChange={(a) => this.onDownloadingChange(a)}
      />
    )
  }
}
