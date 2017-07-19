import * as React from 'react'
import {
  View,
  TabBarIOS
} from 'react-native'

import { CampsiteWithStarred, Position } from '../libs/types'
import CampsiteList from './CampsiteList'
import CampsiteMap from './CampsiteMap'
import * as Icon from 'react-native-vector-icons/Ionicons'

interface Props {
  campsites: CampsiteWithStarred[];
  position: Position | null;
  onPress: (id: number) => void;
}

interface State {
  selectedTab: 'list' | 'map';
}

export default class CampsiteIndexIOS extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { selectedTab: 'list' }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <TabBarIOS barTintColor="#97b13d" tintColor='white' unselectedItemTintColor='white'>
          <Icon.TabBarItemIOS title="List" iconName="ios-list-box-outline" selectedIconName="ios-list-box" selected={this.state.selectedTab === 'list'} onPress={() => {this.setState({selectedTab: 'list'})}}>
            <View style={{flex: 1}}>
              <CampsiteList campsites={this.props.campsites} position={this.props.position} onPress={this.props.onPress}/>
            </View>
          </Icon.TabBarItemIOS>
          <Icon.TabBarItemIOS title="Map" iconName="ios-map-outline" selectedIconName="ios-map" selected={this.state.selectedTab === 'map'} onPress={() => {this.setState({selectedTab: 'map'})}}>
            <View style={{flex: 1}}>
              <CampsiteMap campsites={this.props.campsites} onPress={this.props.onPress}/>
            </View>
          </Icon.TabBarItemIOS>
        </TabBarIOS>
      </View>
    )
  }
}
