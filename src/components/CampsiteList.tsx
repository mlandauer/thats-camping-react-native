import * as React from 'react'
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator
} from 'react-native'

import { CampsiteWithStarredRev, Position } from '../libs/types'
import CampsiteListItem from './CampsiteListItem'
import PositionRelationship from '../libs/PositionRelationship'

interface CampsiteWithDistanceAndBearing extends CampsiteWithStarredRev {
  distance: number | undefined;
  bearing: number | undefined;
}

interface Props {
  campsites: CampsiteWithStarredRev[];
  position: Position | null;
  onPress: (id: string) => void;
}

export default function CampsiteList(props: Props) {
  var campsites = props.campsites.map(function(campsite) {
    return includeDistanceAndBearing(campsite, props.position)
  }).sort(orderCampsites)

  if (props.campsites.length == 0) {
    return (
      <ActivityIndicator animating={true} style={{ marginTop: 10 }} />
    )
  } else {
    return (
      <View style={styles.container}>
        <FlatList
          data={campsites}
          renderItem={({ item }) => renderItem(item, props.onPress)}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={Separator}
        />
      </View>
    )
  }
}

function includeDistanceAndBearing(campsite: CampsiteWithStarredRev, position: Position | null): CampsiteWithDistanceAndBearing {
  let positions = new PositionRelationship(campsite.position, position)
  return {
    ...campsite,
    distance: positions.distanceInMetres(),
    bearing: positions.bearingInDegrees()
  }
}

function renderItem(campsite: CampsiteWithDistanceAndBearing, onPress: (id: string) => void) {
  return (
    <CampsiteListItem campsiteName={campsite.name} parkName={campsite.parkName} starred={campsite.starred} distance={campsite.distance} bearing={campsite.bearing} onPress={() => { onPress(campsite._id) }} />
  )
}

let keyExtractor = (campsite: CampsiteWithStarredRev, _index: number) => String(campsite._id);

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
    height: 0.5,
    backgroundColor: "#ccc",
  }
})
