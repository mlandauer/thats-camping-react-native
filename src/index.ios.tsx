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

export default class ThatsCamping extends React.Component<object, object> {
  renderItem(item: {name: string}) {
    return (
      <Text style={styles.item}>{item.name}</Text>
    )
  }

  _keyExtractor = (item: {name: string}, index: number) => item.name;

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
