import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { View } from 'react-native'
import CampsiteMap from '../components/CampsiteMap'
import { Navigator } from 'react-native-navigation'

import {
  CampsiteWithStarred,
  Position
} from '../libs/types'
import { State } from '../ducks'
import shortenName from '../libs/shortenName'
import { convertToCampsitesWithStarred } from '../libs/convertToCampsiteWithStarred'
import ScreenWithAbout from './ScreenWithAbout'
import * as SynchingActions from '../ducks/synching'

interface Props {
  navigator?: Navigator;
  campsites: { [index: string]: CampsiteWithStarred };
  position: Position | null;
  downloadProgress: number;
  onUpdateProgress: (progress: number) => void;
  replicating: boolean;
}

export class CampsiteMapScreen extends ScreenWithAbout<Props, {}> {
  constructor(props: Props) {
    super(props)
    if (this.props.navigator) {
      this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
    }
  }

  onNavigatorEvent(event: any) {
    super.onNavigatorEvent(event)
    if (event.id === 'didAppear') {
      if (this.props.tracker) {
        this.props.tracker.trackScreenView('Map')
      }
    }
  }

  onPress(id: string) {
    if (this.props.navigator) {
      var campsite = this.props.campsites[id]
      if (this.props.tracker) {
        this.props.tracker.trackScreenView("Detail")
      }
      this.props.navigator.push({
        screen: 'thatscamping.CampsiteDetailScreen',
        title: shortenName(campsite.name),
        backButtonTitle: 'Back',
        passProps: { id: id }
      })
    }
  }

  render() {
    // We could use Object.values to do this but typescript complains. So...
    let campsites = []
    for (let id in this.props.campsites) {
      campsites.push(this.props.campsites[id])
    }
    return (
      <View style={{ flex: 1 }}>
        <CampsiteMap
          campsites={campsites}
          onPress={(id) => this.onPress(id)}
          downloadProgress={this.props.downloadProgress}
          onUpdateProgress={this.props.onUpdateProgress}
          replicating={this.props.replicating}
        />
      </View>
    );
  }
}

function mapStateToProps(state: State, _ownProps: {}) {
  return {
    // Put the star state directly into each campsite object to make things easier
    // elsewhere
    campsites: convertToCampsitesWithStarred(state.campsites, state.starred),
    position: state.position,
    downloadProgress: state.synching.mapProgress,
    replicating: state.synching.replicating
  };
}

const mapDispatchToProps = (dispatch: Dispatch<State>) => {
  return {
    onUpdateProgress: (progress: number) => {
      dispatch(SynchingActions.updateMapProgress(progress))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CampsiteMapScreen)
