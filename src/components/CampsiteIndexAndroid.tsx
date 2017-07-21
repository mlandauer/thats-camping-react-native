import * as React from 'react'
import {
  View,
} from 'react-native'

import { CampsiteWithStarred, Position } from '../libs/types'
import CampsiteList from './CampsiteList'

interface Props {
  campsites: CampsiteWithStarred[];
  position: Position | null;
  onPress: (id: number) => void;
}

export default class CampsiteIndexAndroid extends React.Component<Props, {}> {
  render() {
    return (
      <View style={{flex: 1}}>
        <CampsiteList campsites={this.props.campsites} position={this.props.position} onPress={this.props.onPress}/>
      </View>
    )
  }
}
