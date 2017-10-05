import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { View } from 'react-native'
import CampsiteList from '../components/CampsiteList'
import { Navigator } from 'react-native-navigation'
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge'

import {
  CampsiteWithStarred,
  Position
} from '../libs/types'
import { State } from '../ducks'
import shortenName from '../libs/shortenName'
import { convertToCampsitesWithStarred } from '../libs/convertToCampsiteWithStarred'
import ScreenWithAbout from './ScreenWithAbout'

interface Props {
  navigator?: Navigator;
  campsites: { [index: string]: CampsiteWithStarred };
  position: Position | null;
  tracker: GoogleAnalyticsTracker;
}

export class CampsiteListScreen extends ScreenWithAbout<Props, {}> {

  constructor(props: Props) {
    super(props)
    if (this.props.navigator) {
      this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
    }
  }

  onNavigatorEvent(event: any) {
    if (event.id === 'bottomTabSelected') {
      this.props.tracker.trackScreenView('List')
    }
  }

  onPress(id: string) {
    if (this.props.navigator) {
      var campsite = this.props.campsites[id]
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
        <CampsiteList campsites={campsites} position={this.props.position} onPress={(id) => this.onPress(id)} />
      </View>
    );
  }
}

function mapStateToProps(state: State, _ownProps: {}) {
  return {
    // Put the star state directly into each campsite object to make things easier
    // elsewhere
    campsites: convertToCampsitesWithStarred(state.campsites, state.starred),
    position: state.position
  };
}

const mapDispatchToProps = (_dispatch: Dispatch<State>) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(CampsiteListScreen)
