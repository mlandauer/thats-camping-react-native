import * as React from 'react'
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
