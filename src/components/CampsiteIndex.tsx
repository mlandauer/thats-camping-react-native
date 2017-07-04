import * as React from 'react'
import {
  View,
  FlatList,
  StyleSheet,
  TabBarIOS,
  Alert
} from 'react-native'

import { Campsite, Position } from '../libs/types'
import CampsiteList from './CampsiteList'
import CampsiteMap from './CampsiteMap'
import * as Icon from 'react-native-vector-icons/FontAwesome'

interface Props {
  campsites: Campsite[];
  position: Position | null;
  onPress: (id: number) => void;
}

interface State {
  selectedTab: 'list' | 'map';
}

// State is whether list is currently shown
export default class CampsiteIndex extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {selectedTab: 'list'}
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <TabBarIOS barTintColor="#97b13d" tintColor='#ddd' unselectedItemTintColor='white'>
          <Icon.TabBarItemIOS title="List" iconName="list" selected={this.state.selectedTab === 'list'} onPress={() => {this.setState({selectedTab: 'list'})}}>
            <View style={{flex: 1}}>
              <CampsiteList campsites={this.props.campsites} position={this.props.position} onPress={this.props.onPress}/>
            </View>
          </Icon.TabBarItemIOS>
          <Icon.TabBarItemIOS title="Map" iconName="map-marker" selected={this.state.selectedTab === 'map'} onPress={() => {this.setState({selectedTab: 'map'})}}>
            <View style={{flex: 1}}>
              <CampsiteMap campsites={this.props.campsites} />
            </View>
          </Icon.TabBarItemIOS>
        </TabBarIOS>
      </View>
    )
  }
}
