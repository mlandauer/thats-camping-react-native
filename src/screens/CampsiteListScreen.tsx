import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { View } from 'react-native'
import CampsiteList from '../components/CampsiteList'
import { Navigator } from 'react-native-navigation'

import {
  CampsiteWithStarred,
  Position
} from '../libs/types'
import { State } from '../ducks'
import shortenName from '../libs/shortenName'
import convertToCampsiteWithStarred from '../libs/convertToCampsiteWithStarred'
import ScreenWithAbout from './ScreenWithAbout'

interface Props {
  navigator?: Navigator;
  campsites: {[index: string]: CampsiteWithStarred};
  position: Position | null;
}

export class CampsiteListScreen extends ScreenWithAbout<Props, {}> {
  onPress(id: string) {
    if (this.props.navigator) {
      var campsite: CampsiteWithStarred = this.props.campsites[id]
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
      <View style={{flex: 1}}>
        <CampsiteList campsites={campsites} position={this.props.position} onPress={(id) => {this.onPress(id)}}/>
      </View>
    );
  }
}

function mapStateToProps(state: State, _ownProps: {}) {
  // Put the star state directly into each campsite object to make things easier
  // elsewhere
  let campsitesWithStarred : {[index:string]: CampsiteWithStarred} = {}
  for (var id in state.campsites) {
    campsitesWithStarred[id] = convertToCampsiteWithStarred(state.campsites[id],
      state.starred)
  }

  return {
    campsites: campsitesWithStarred,
    position: state.position
  };
}

const mapDispatchToProps = (_dispatch: Dispatch<State>) => {
  return { }
}

export default connect(mapStateToProps, mapDispatchToProps)(CampsiteListScreen)
