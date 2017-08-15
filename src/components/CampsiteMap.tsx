import * as React from 'react'
import {
  Alert
} from 'react-native'
import { MapView } from 'react-native-mapbox-gl'

import { CampsiteWithStarred } from '../libs/types'
import shortenName from '../libs/shortenName'

interface Props {
  campsites: CampsiteWithStarred[];
  onPress: (id: string) => void;
}

interface RightAnnotationTappedInfo {
  id: string;
  title: null | string;
  subtitle: null | string;
  latitude: number;
  longitude: number;
}

export default function CampsiteMap(props: Props) {
  // Centering on the "Heartbreak Hill camping area"
  // to start with
  let initialCenterCoordinate = {
    latitude: -33.2709845533332,
    longitude: 150.897112779999
  }

  return (
    <MapView
      style={{flex: 1}}
      styleURL="mapbox://styles/mapbox/outdoors-v10"
      showsUserLocation={true}
      rotateEnabled={false}
      initialCenterCoordinate={initialCenterCoordinate}
      initialZoomLevel={5}
      logoIsHidden={true}
      annotations={annotations(props.campsites)}
      onRightAnnotationTapped={(info: RightAnnotationTappedInfo) => props.onPress(info.id)}
    />
  )
}

function annotations(campsites: CampsiteWithStarred[]) {
  return campsites
    .filter(campsite => annotation(campsite))
    .map(campsite => annotation(campsite))
}

function annotation(campsite: CampsiteWithStarred) {
  if (campsite.position) {
    return {
      coordinates: [campsite.position.lat, campsite.position.lng],
      type: 'point',
      title: shortenName(campsite.name),
      subtitle: shortenName(campsite.parkName),
      id: campsite._id,
      rightCalloutAccessory: {
        source: {
          uri: 'ion-ios-arrow-forward'
        },
        height: 20,
        width: 20,
      }
    }
  } else {
    return null
  }
}
