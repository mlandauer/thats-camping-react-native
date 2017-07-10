import * as React from 'react'
import {
  View,
  FlatList,
  StyleSheet
} from 'react-native'

import { CampsiteWithStarred, Position } from '../libs/types'
import CampsiteListItem from './CampsiteListItem'
import PositionRelationship from '../libs/PositionRelationship'

interface CampsiteWithDistanceAndBearing extends CampsiteWithStarred {
  distance: number | undefined;
  bearing: number | undefined;
}

interface Props {
  campsites: CampsiteWithStarred[];
  position: Position | null;
  onPress: (id: number) => void;
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
        data={sortCampsitesArrayByDistance(campsites2, props.position)}
        renderItem={({item}) => renderItem(item, props.onPress)}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={Separator}
      />
    </View>
  )
}

function renderItem(campsite: CampsiteWithDistanceAndBearing, onPress: (id: number) => void) {
  return (
    <CampsiteListItem campsiteName={campsite.name} parkName={campsite.parkName} distance={campsite.distance} bearing={campsite.bearing} onPress={() => { onPress(campsite.id) }}/>
  )
}

let keyExtractor = (campsite: CampsiteWithStarred, index: number) => String(campsite.id);

class Separator extends React.Component<any, any> {
  render() {
    return (
      <View style={styles.separator} />
    )
  }
}

function sortCampsitesArrayByDistance(campsites: CampsiteWithDistanceAndBearing[], position: Position | null): CampsiteWithDistanceAndBearing[] {
  // TODO: Put starred campsites at the top
  // Sort campsites by distance
  return campsites.sort(function(a: CampsiteWithDistanceAndBearing, b: CampsiteWithDistanceAndBearing) {
    if (a.distance == undefined && b.distance == undefined) {
      return a.name.localeCompare(b.name)
    }
    if (a.distance == undefined) {
      return 1
    }
    if (b.distance == undefined) {
      return -1
    }
    if (a.distance > b.distance) {
      return 1
    }
    if (a.distance < b.distance) {
      return -1
    }
    return 0;
  })
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
