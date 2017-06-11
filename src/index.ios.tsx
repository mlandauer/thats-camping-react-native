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

class Separator extends React.Component<any, any> {
  render() {
    return (
      <View style={styles.separator} />
    )
  }
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
              "parkName": "Blue Mountains NP"
            },
            {
              "name": "Alexanders Hut",
              "parkName": "South East Forest NP"
            },
            {
              "name": "Apsley Falls campground",
              "parkName": "Oxley Wild Rivers NP"
            }
          ]}
          renderItem={({item}) => this.renderItem(item)}
          keyExtractor={this._keyExtractor}
          ItemSeparatorComponent={Separator}
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
  separator: {
    height: 1,
    backgroundColor: "#CED0CE",
  }
})

AppRegistry.registerComponent('ThatsCamping', () => ThatsCamping);
