import * as React from 'react'
import {
  Platform
} from 'react-native'

import { CampsiteWithStarred, Position } from '../libs/types'
import CampsiteIndexIOS from './CampsiteIndexIOS'
import CampsiteIndexAndroid from './CampsiteIndexAndroid'


interface Props {
  campsites: CampsiteWithStarred[];
  position: Position | null;
  onPress: (id: number) => void;
}

// If we weren't using typescript we could use the platform specific extensions
// to automatically switch between the different versions but we can't do that
// currently easily and maintain type safety.
// See https://github.com/Microsoft/TypeScript/issues/8328

export default class CampsiteIndex extends React.Component<Props, {}> {
  render() {
    if (Platform.OS == 'ios') {
      return (
        <CampsiteIndexIOS campsites={this.props.campsites} position={this.props.position} onPress={this.props.onPress} />
      )
    } else {
      return (
        <CampsiteIndexAndroid campsites={this.props.campsites} position={this.props.position} onPress={this.props.onPress} />
      )
    }
  }
}
