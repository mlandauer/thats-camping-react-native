import * as React from 'react'
import {
  StyleSheet,
  Text
} from 'react-native'

interface Props {
  campsiteName: string;
  parkName: string;
}

function CampsiteListItem(props: Props) {
  return (
    <Text style={styles.item}>{props.campsiteName}, {props.parkName}</Text>
  )
}

export default CampsiteListItem

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 60,
  },
})
