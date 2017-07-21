import * as React from 'react'
import {
  View,
} from 'react-native'
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view'

import { CampsiteWithStarred, Position } from '../libs/types'
import CampsiteList from './CampsiteList'
import CampsiteMap from './CampsiteMap'

interface Props {
  campsites: CampsiteWithStarred[];
  position: Position | null;
  onPress: (id: number) => void;
}

interface State {
  index: number;
  routes: {key: string, title: string}[]
}


// State is whether list is currently shown
export default class CampsiteIndexAndroid extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      index: 0,
      routes: [
        { key: '1', title: 'List' },
        { key: '2', title: 'Map' },
      ]
    }

  }

  ListRoute = () => <View style={{flex: 1}}><CampsiteList campsites={this.props.campsites} position={this.props.position} onPress={this.props.onPress}/></View>

  MapRoute = () => <View style={{flex: 1}}><CampsiteMap campsites={this.props.campsites} onPress={this.props.onPress}/></View>

  render() {
    return (
      <View style={{flex: 1}}>
        <TabViewAnimated
          navigationState={this.state}
          renderScene={this._renderScene}
          renderFooter={this._renderFooter}
          onRequestChangeTab={this._handleChangeTab}
        />
      </View>
    )
  }

  _handleChangeTab = (index: number) => this.setState({ index })

  _renderFooter = (props: Props) => <TabBar style={{backgroundColor: '#97b13d'}} {...props} />

  _renderScene = SceneMap({
      '1': this.ListRoute,
      '2': this.MapRoute,
    })
}
