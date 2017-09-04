import * as React from 'react'
import { Alert } from 'react-native'
import { connect, Dispatch } from 'react-redux'

import { State } from '../ducks'
import OfflineMapControls from '../components/OfflineMapControls'

interface Props {
  downloading: boolean;
}

export class OfflineMapScreen extends React.Component<Props, {}> {
  static navigatorStyle = {
    tabBarHidden: true
  }

  onDownloadingChange(_downloading: boolean) {
    Alert.alert("changed")
  }

  render() {
    return (
      <OfflineMapControls
        downloading={this.props.downloading}
        onDownloadingChange={(a) => this.onDownloadingChange(a)}
      />
    )
  }
}

function mapStateToProps(state: State, _ownProps: {}) {
  return {
    downloading: state.offlineMap.downloading
  };
}

const mapDispatchToProps = (_dispatch: Dispatch<State>) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(OfflineMapScreen)
