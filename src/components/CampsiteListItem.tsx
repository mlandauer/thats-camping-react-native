import * as React from 'react'
import {
  StyleSheet,
  Text
} from 'react-native'

interface Props {
  name: string;
}

function CampsiteListItem(props: Props) {
  return (
    <Text style={styles.item}>{props.name}</Text>
  )
}

export default CampsiteListItem

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})
