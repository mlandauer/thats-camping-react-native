import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import * as MapView from 'react-native-maps'
import Icon from 'react-native-vector-icons/Ionicons'

import { CampsiteWithStarred } from '../libs/types'
import shortenName from '../libs/shortenName'

interface Props {
  campsites: CampsiteWithStarred[];
  onPress: (id: number) => void;
}

export default function CampsiteMap(props: Props) {
  let initialRegion = {
    // Centering on the "Heartbreak Hill camping area"
    // to start with
    latitude: -33.2709845533332,
    longitude: 150.897112779999,
    latitudeDelta: 5.0,
    longitudeDelta: 5.0
  }

  return (
    <MapView style={{flex: 1}} showsUserLocation={true} rotateEnabled={false} initialRegion={initialRegion}>
      {props.campsites.map(campsite => (
        <CampsiteMarker campsite={campsite} key={campsite.id} onPress={() => {props.onPress(campsite.id)}} />
      ))}
    </MapView>
  )
}

interface CampsiteMarkerProps {
  campsite: CampsiteWithStarred;
  onPress: () => void;
}

function CampsiteMarker(props: CampsiteMarkerProps) {
  if (props.campsite.position == undefined) {
    return null
  }
  let coordinate = {
    latitude: props.campsite.position.lat,
    longitude: props.campsite.position.lng
  }
  return (
    <MapView.Marker
      coordinate={coordinate}
      title={props.campsite.name}
      description={props.campsite.description}>
      <MapView.Callout onPress={props.onPress}>
        <View style={{flexDirection: 'row'}} >
          <View>
            <Text style={styles.heading}>{shortenName(props.campsite.name)}</Text>
            <Text style={styles.park}>{shortenName(props.campsite.parkName)}</Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Icon style={styles.arrow} name="ios-arrow-forward"/>
          </View>
        </View>
      </MapView.Callout>
    </MapView.Marker>
  )
}

const styles = StyleSheet.create({
  heading: {
    fontWeight: 'bold' as 'bold',
    fontSize: 20
  },
  park: {
    fontSize: 20,
    color: '#aaa'
  },
  arrow: {
    marginLeft: 20,
    fontSize: 20,
    color: '#aaa'
  }
})
