import * as React from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import shortenName from '../libs/shortenName'

interface Props {
  campsiteName: string;
  parkName: string;
  distance: number;
  bearing: number;
}

function CampsiteListItem(props: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.campsiteName}>{shortenName(props.campsiteName)}</Text>
      <Text style={styles.parkName}>{shortenName(props.parkName)}</Text>
    </View>
  )
}

export default CampsiteListItem

const styles = StyleSheet.create({
  container: {
    padding: 15
  },
  campsiteName: {
    fontSize: 20,
    fontWeight: "500" as "500"
  },
  parkName: {
    fontSize: 20
  }
})
