import * as React from 'react'
import {
  View,
  FlatList,
  StyleSheet
} from 'react-native'

import { Campsite, Position } from '../libs/types'
import CampsiteListItem from './CampsiteListItem'
import PositionRelationship from '../libs/PositionRelationship'

interface CampsiteWithDistanceAndBearing extends Campsite {
  distance: number | undefined;
  bearing: number | undefined;
}

interface Props {
  campsites: Campsite[];
  position: Position | null;
}

export default function CampsiteList(props: Props) {
  var campsites2 = props.campsites.map(function(c): CampsiteWithDistanceAndBearing {
  let positions = new PositionRelationship(c.position, props.position)
  return Object.assign({}, c, {
    distance: positions.distanceInMetres(),
    bearing: positions.bearingInDegrees()})
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={campsites2}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={Separator}
      />
    </View>
  )
}

function renderItem(campsite: CampsiteWithDistanceAndBearing) {
  return (
    <CampsiteListItem campsiteName={campsite.name} parkName={campsite.parkName} distance={campsite.distance} bearing={campsite.bearing}/>
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
