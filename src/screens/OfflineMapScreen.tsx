import * as React from 'react'
import { connect } from 'react-redux'

import { State } from '../ducks'
import OfflineMapControls from '../components/OfflineMapControls'

interface Props {
  progress: number;
}

export class OfflineMapScreen extends React.Component<Props, {}> {
  static navigatorStyle = {
    tabBarHidden: true
  }

  render() {
    return (
      <OfflineMapControls progress={this.props.progress} />
    )
  }
}

function mapStateToProps(state: State, _ownProps: {}) {
  return state.offlineMap
}

export default connect(mapStateToProps)(OfflineMapScreen)
