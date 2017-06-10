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
}

export default class ThatsCamping extends React.Component<object, object> {
  renderItem(campsite: Campsite) {
    return (
      <CampsiteListItem name={campsite.name}/>
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
})

AppRegistry.registerComponent('ThatsCamping', () => ThatsCamping);
