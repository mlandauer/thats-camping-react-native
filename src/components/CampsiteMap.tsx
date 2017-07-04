import * as React from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import * as MapView from 'react-native-maps'

import { Campsite } from '../libs/types'

interface Props {
  campsites: Campsite[];
  onPress: (id: number) => void;
}

export default function CampsiteMap(props: Props) {
  return (
    <MapView style={{flex: 1}}>
      {props.campsites.map(campsite => (
        <CampsiteMarker campsite={campsite} key={campsite.id} onPress={() => {props.onPress(campsite.id)}} />
      ))}
    </MapView>
  )
}

interface CampsiteMarkerProps {
  campsite: Campsite;
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
      description={props.campsite.description}
      onCalloutPress={props.onPress}
    />
  )
}

const styles = StyleSheet.create({
  paragraph: {
    fontSize: 20,
    marginBottom: 10
  },
})
