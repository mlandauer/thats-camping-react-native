import * as React from 'react'
import {
  View
} from 'react-native'
import { MapView } from 'react-native-mapbox-gl'

import { CampsiteWithStarred } from '../libs/types'
import shortenName from '../libs/shortenName'
import OfflineMapControls from './OfflineMapControls'

interface Props {
  campsites: CampsiteWithStarred[];
  onPress: (id: string) => void;
  downloadProgress: number;
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
    <View style={{flex: 1}}>
      <MapView
        style={{ flex: 1 }}
        styleURL="mapbox://styles/mapbox/outdoors-v10"
        showsUserLocation={true}
        rotateEnabled={false}
        initialCenterCoordinate={initialCenterCoordinate}
        initialZoomLevel={5}
        logoIsHidden={true}
        annotations={annotations(props.campsites)}
        onRightAnnotationTapped={(info: RightAnnotationTappedInfo) => props.onPress(info.id)}
      />
      <OfflineMapControls progress={props.downloadProgress}/>
    </View>
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
