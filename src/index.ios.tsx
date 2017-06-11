/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import * as React from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  FlatList
} from 'react-native';
import CampsiteListItem from './components/CampsiteListItem'

interface Campsite {
  name: string;
  parkName: string;
}

export default class ThatsCamping extends React.Component<object, object> {
  renderItem(campsite: Campsite) {
    return (
      <CampsiteListItem campsiteName={campsite.name} parkName={campsite.parkName}/>
    )
  }

  _keyExtractor = (campsite: Campsite, index: number) => campsite.name;

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={[
            {
              "name": "Acacia Flat",
              "parkName": "Blue Mountains National Park"
            },
            {
              "name": "Alexanders Hut",
              "parkName": "South East Forest National Park"
            },
            {
              "name": "Apsley Falls campground",
              "parkName": "Oxley Wild Rivers National Park"
            }
          ]}
          renderItem={({item}) => this.renderItem(item)}
          keyExtractor={this._keyExtractor}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
})

AppRegistry.registerComponent('ThatsCamping', () => ThatsCamping);
