import * as React from 'react'
import {
  View,
  FlatList,
  StyleSheet
} from 'react-native'

import { Campsite } from '../libs/types'
import CampsiteListItem from './CampsiteListItem'

interface Props {
  campsites: {[index: number]: Campsite};
}

export default function CampsiteList(props: Props) {
  return (
    <View style={styles.container}>
      <FlatList
        data={Object.values(props.campsites)}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={Separator}
      />
    </View>
  )
}

function renderItem(campsite: Campsite) {
  return (
    <CampsiteListItem campsiteName={campsite.name} parkName={campsite.parkName} distance={1.0} bearing={180}/>
  )
}

let keyExtractor = (campsite: Campsite, index: number) => String(campsite.id);

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
