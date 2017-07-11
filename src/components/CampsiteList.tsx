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
  var campsites = props.campsites.map(function(campsite) {
    return includeDistanceAndBearing(campsite, props.position)
  }).sort(orderCampsites)

  return (
    <View style={styles.container}>
      <FlatList
        data={campsites}
        renderItem={({item}) => renderItem(item, props.onPress)}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={Separator}
      />
    </View>
  )
}

function includeDistanceAndBearing(campsite: CampsiteWithStarred, position: Position | null): CampsiteWithDistanceAndBearing {
  let positions = new PositionRelationship(campsite.position, position)
  return Object.assign({}, campsite, {
    distance: positions.distanceInMetres(),
    bearing: positions.bearingInDegrees()
  })
}

function renderItem(campsite: CampsiteWithDistanceAndBearing, onPress: (id: number) => void) {
  return (
    <CampsiteListItem campsiteName={campsite.name} parkName={campsite.parkName} starred={campsite.starred} distance={campsite.distance} bearing={campsite.bearing} onPress={() => { onPress(campsite.id) }}/>
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

function orderCampsites(a: CampsiteWithDistanceAndBearing, b: CampsiteWithDistanceAndBearing): number {
  if (a.starred == b.starred) {
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
  } else if (a.starred && !b.starred) {
    return -1;
  }
  else {
    return 1;
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
