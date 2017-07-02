import * as React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native'
import shortenName from '../libs/shortenName'
import * as TextFormatter from '../libs/TextFormatter'

interface Props {
  campsiteName: string;
  parkName: string;
  distance: number | undefined;
  bearing: number | undefined;
  onPress: () => void;
}

function CampsiteListItem(props: Props) {
  return (
    <TouchableHighlight onPress={props.onPress}>
      <View style={styles.container}>
        <View>
          <Text style={styles.campsiteName}>{shortenName(props.campsiteName)}</Text>
          <Text style={styles.parkName}>{shortenName(props.parkName)}</Text>
        </View>
        <Text style={styles.distanceAndBearing}>{TextFormatter.distanceText(props.distance)} {TextFormatter.bearingText(props.bearing)}</Text>
      </View>
    </TouchableHighlight>
  )
}

export default CampsiteListItem

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },
  campsiteName: {
    fontSize: 17,
    fontWeight: "500" as "500"
  },
  parkName: {
    fontSize: 17,
    color: '#aaa'
  },
  distanceAndBearing: {
    fontSize: 17,
    color: '#aaa'
  }
})
