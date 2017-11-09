import * as React from 'react'
import {
  View,
  Image,
  StyleSheet,
  Text,
  Animated,
  TouchableHighlight,
  Alert,
} from 'react-native'
import MapboxGL from '@mapbox/react-native-mapbox-gl'

import { CampsiteWithStarred } from '../libs/types'
import shortenName from '../libs/shortenName'
import OfflineMapControls from './OfflineMapControls'
// import * as Map from '../libs/Map'
import Activity from './Activity'

interface Props {
  campsites: CampsiteWithStarred[];
  replicating: boolean;
  onPress: (id: string) => void;
  // TODO: Move this state locally?
  downloadProgress: number;
  onUpdateProgress: (progress: number) => void;
}

// interface RightAnnotationTappedInfo {
//   id: string;
//   title: null | string;
//   subtitle: null | string;
//   latitude: number;
//   longitude: number;
// }

export default class CampsiteMap extends React.Component<Props, {}> {
  // finishLoading() {
  //   Map.initialiseOffline(progress => this.props.onUpdateProgress(progress))
  // }

  render() {
    // Centering on the "Heartbreak Hill camping area"
    // to start with
    let initialCenterCoordinate = [
      150.897112779999, -33.2709845533332
    ]

    return (
      <View style={{flex: 1}}>
        <Activity active={this.props.campsites.length == 0 || this.props.replicating} />
        <MapboxGL.MapView
          style={{flex: 1}}
          styleURL="mapbox://styles/mapbox/outdoors-v10"
          showUserLocation={true}
          rotateEnabled={false}
          pitchEnabled={false}
          centerCoordinate={initialCenterCoordinate}
          zoomLevel={7}
          logoEnabled={false}
        >
          {
            this.props.campsites
              .filter(campsite => campsite.position)
              .map(campsite => <Annotation campsite={campsite} key={campsite._id}/>)
          }
        </MapboxGL.MapView>
        {
          // <MapView
          //   onFinishLoadingMap={() => this.finishLoading()}
          //   annotations={annotations(this.props.campsites)}
          //   onRightAnnotationTapped={(info: RightAnnotationTappedInfo) => this.props.onPress(info.id)}
          // />
        }
        <OfflineMapControls progress={this.props.downloadProgress} />
      </View>
    )
  }
}

function Annotation(props: {campsite: CampsiteWithStarred}) {
  if (props.campsite.position) {
    return (
      <MapboxGL.PointAnnotation
        id={props.campsite._id}
        title={shortenName(props.campsite.name)}
        coordinate={[ props.campsite.position.lng, props.campsite.position.lat ]}
      >
        <Image
          style={{height: 82.5, width: 29.6}}
          source={{
            uri: (props.campsite.starred ? 'starred_map_pin' : 'default_map_pin')}
          }
        />
        <MapboxGL.Callout>
          <Animated.View style={styles.container}>
            <View style={styles.content}>
              <TouchableHighlight onPress={() => Alert.alert("pressed")} >
                <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 10}}>
                  <View>
                    <Text style={styles.campsiteName}>{shortenName(props.campsite.name)}</Text>
                    <Text style={styles.parkName}>{shortenName(props.campsite.parkName)}</Text>
                  </View>
                  <Image source={{ uri: 'ion-ios-arrow-forward' }} style={{width: 30, height: 30, paddingLeft: 30}} />
                </View>
              </TouchableHighlight>
            </View>
            <View style={styles.tip} />
          </Animated.View>
        </MapboxGL.Callout>
      </MapboxGL.PointAnnotation>
    )
  } else {
    return null
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    zIndex: 9999999,
  },
  tip: {
    zIndex: 1000,
    marginTop: -2,
    elevation: 0,
    backgroundColor: 'transparent',
    borderTopWidth: 16,
    borderRightWidth: 8,
    borderBottomWidth: 0,
    borderLeftWidth: 8,
    borderTopColor: 'white',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  content: {
    position: 'relative',
    flex: 1,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    backgroundColor: 'white',
  },
  campsiteName: {
    fontSize: 20,
    fontWeight: "500"
  },
  parkName: {
    fontSize: 20,
    color: '#aaa'
  }
});
