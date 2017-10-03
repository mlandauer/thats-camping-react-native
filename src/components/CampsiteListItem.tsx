import * as React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native'

import shortenName from '../libs/shortenName'
import * as TextFormatter from '../libs/TextFormatter'
import Star from '../components/Star'

interface Props {
  campsiteName: string;
  parkName: string;
  starred: boolean;
  distance: number | undefined;
  bearing: number | undefined;
  onPress: () => void;
}

export default function CampsiteListItem(props: Props) {
  return (
    <TouchableHighlight onPress={props.onPress}>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Text style={styles.campsiteName}>{shortenName(props.campsiteName)}</Text>
          <Text numberOfLines={1} style={styles.parkName}>{props.parkName}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.distanceAndBearing}>{TextFormatter.distanceText(props.distance)} {TextFormatter.bearingText(props.bearing)}</Text>
          <HidingStar starred={props.starred} size={24} />
        </View>
      </View>
    </TouchableHighlight>
  )
}

function HidingStar(props: { starred: boolean, size: number }) {
  if (props.starred) {
    return (
      <Star starred={props.starred} size={props.size} />
    )
  } else {
    return null
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },
  campsiteName: {
    fontSize: 20,
    fontWeight: "500" as "500"
  },
  parkName: {
    fontSize: 20,
    color: '#aaa'
  },
  distanceAndBearing: {
    fontSize: 20,
    color: '#aaa'
  }
})
