import * as React from 'react'
import { connect, Dispatch } from 'react-redux'

import { State } from '../ducks'
import { updateDownloadingAsync } from '../ducks/offlineMapAsync'
import OfflineMapControls from '../components/OfflineMapControls'

interface Props {
  downloading: boolean;
  progress: number;
  message: string | null;
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
        progress={this.props.progress}
        message={this.props.message}
        onDownloadingChange={this.props.onDownloadingChange}
      />
    )
  }
}

function mapStateToProps(state: State, _ownProps: {}) {
  return state.offlineMap
}

const mapDispatchToProps = (dispatch: Dispatch<State>) => {
  return {
    onDownloadingChange: (downloading: boolean) => {
      dispatch(updateDownloadingAsync(downloading))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OfflineMapScreen)
