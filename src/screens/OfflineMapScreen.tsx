import * as React from 'react'
// import { Alert } from 'react-native'
import { connect, Dispatch } from 'react-redux'

import { State } from '../ducks'
import { updateDownloading } from '../ducks/offlineMap'
import OfflineMapControls from '../components/OfflineMapControls'

interface Props {
  downloading: boolean;
  onDownloadingChange: (downloading: boolean) => void;
}

export class OfflineMapScreen extends React.Component<Props, {}> {
  static navigatorStyle = {
    tabBarHidden: true
  }

  // onDownloadingChange(_downloading: boolean) {
  //   Alert.alert("changed")
  // }

  render() {
    return (
      <OfflineMapControls
        downloading={this.props.downloading}
        onDownloadingChange={this.props.onDownloadingChange}
      />
    )
  }
}

function mapStateToProps(state: State, _ownProps: {}) {
  return {
    downloading: state.offlineMap.downloading
  };
}

const mapDispatchToProps = (dispatch: Dispatch<State>) => {
  return {
    onDownloadingChange: (downloading: boolean) => {
      dispatch(updateDownloading(downloading))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OfflineMapScreen)
