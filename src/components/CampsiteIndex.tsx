import * as React from 'react'
import {
  View,
  TabBarIOS,
  Platform
} from 'react-native'
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view'

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
  index: number;
  routes: {key: string, title: string}[]
}


// State is whether list is currently shown
export default class CampsiteIndex extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      selectedTab: 'list',
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
    if (Platform.OS == 'ios') {
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
    } else {
      return (
        <View style={{flex: 1}}>
          <TabViewAnimated
            navigationState={this.state}
            renderScene={this._renderScene}
            renderHeader={this._renderHeader}
            onRequestChangeTab={this._handleChangeTab}
          />
        </View>
      )
    }
  }

  _handleChangeTab = (index: number) => this.setState({ index })

  _renderHeader = (props: Props) => <TabBar style={{backgroundColor: '#97b13d'}} {...props} />

  _renderScene = SceneMap({
      '1': this.ListRoute,
      '2': this.MapRoute,
    })
}
