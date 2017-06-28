import * as React from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import shortenName from '../libs/shortenName'
import * as TextFormatter from '../libs/TextFormatter'

interface Props {
  campsiteName: string;
  parkName: string;
  distance: number | undefined;
  bearing: number | undefined;
}

function CampsiteListItem(props: Props) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.campsiteName}>{shortenName(props.campsiteName)}</Text>
        <Text style={styles.parkName}>{shortenName(props.parkName)}</Text>
      </View>
      <Text style={styles.distanceAndBearing}>{TextFormatter.distanceText(props.distance)} {TextFormatter.bearingText(props.bearing)}</Text>
    </View>
  )
}

export default CampsiteListItem

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
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
