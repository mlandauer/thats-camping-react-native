/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import * as React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';

interface Campsite {
  name: string;
}

export default class ThatsCamping extends React.Component<object, object> {
  renderItem(campsite: Campsite) {
    return (
      <Text style={styles.item}>{campsite.name}</Text>
    )
  }

  _keyExtractor = (campsite: Campsite, index: number) => campsite.name;

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={[
            {name: 'Devin'},
            {name: 'Jackson'},
            {name: 'James'},
            {name: 'Joel'},
            {name: 'John'},
            {name: 'Jillian'},
            {name: 'Jimmy'},
            {name: 'Julie'},
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
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

AppRegistry.registerComponent('ThatsCamping', () => ThatsCamping);
