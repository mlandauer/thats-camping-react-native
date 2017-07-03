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
import * as Icon from 'react-native-vector-icons/FontAwesome'

interface Props {
  campsites: Campsite[];
  position: Position | null;
  onPress: (id: number) => void;
}

export default function CampsiteIndex(props: Props) {
  return (
    <View style={{flex: 1}}>
      <CampsiteList campsites={props.campsites} position={props.position} onPress={props.onPress}/>
      <TabBarIOS style={{maxHeight: 50}} barTintColor="#97b13d" tintColor='#ddd' unselectedItemTintColor='white'>
        <Icon.TabBarItemIOS title="List" iconName="list" onPress={listSelected}/>
        <Icon.TabBarItemIOS title="Map" iconName="map-marker" onPress={mapSelected}/>
      </TabBarIOS>
    </View>
  )
}

function listSelected() {
  Alert.alert("list selected")
}

function mapSelected() {
  Alert.alert("map selected")
}
