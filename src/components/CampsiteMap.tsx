import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import * as MapView from 'react-native-maps'

import { Campsite } from '../libs/types'

interface Props {
  campsites: Campsite[];
}

export default function CampsiteMap(props: Props) {
  return (
    <MapView style={{flex: 1}}>
      {props.campsites.map(campsite => (
        <CampsiteMarker campsite={campsite} key={campsite.id} />
      ))}
    </MapView>
  )
}

interface CampsiteMarkerProps {
  campsite: Campsite;
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
    />
  )
}

const styles = StyleSheet.create({
  paragraph: {
    fontSize: 20,
    marginBottom: 10
  },
})
