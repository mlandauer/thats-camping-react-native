import * as React from 'react'
import {
  View,
  FlatList,
  StyleSheet,
  Button
} from 'react-native'
import CampsiteListItem from '../components/CampsiteListItem'

interface Props {
}

interface Campsite {
  name: string;
  parkName: string;
}

export default class CampsiteList extends React.Component<Props, {}> {
  renderItem(campsite: Campsite) {
    return (
      <CampsiteListItem campsiteName={campsite.name} parkName={campsite.parkName} distance={1.0} bearing={180}/>
    )
  }

  _keyExtractor = (campsite: Campsite, index: number) => campsite.name;

  onPressAbout = () => {
    this.props.navigator.push({
      screen: 'thatscamping.AboutScreen',
      title: 'About'
    });
  }

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
          ItemSeparatorComponent={Separator}
        />
        <Button
          onPress={this.onPressAbout}
          title="About"
        />
      </View>
    );
  }
}

class Separator extends React.Component<any, any> {
  render() {
    return (
      <View style={styles.separator} />
    )
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: "#CED0CE",
  }
})
