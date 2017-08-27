import * as React from 'react'

import OfflineMapControls from '../components/OfflineMapControls'

export default class OfflineMapScreen extends React.Component<{}, {}> {
  static navigatorStyle = {
    tabBarHidden: true
  }

  render() {
    return (
      <OfflineMapControls />
    )
  }
}
