import * as React from 'react'
import { StyleSheet } from 'react-native'
import Button from 'react-native-button'
import Icon from 'react-native-vector-icons/Ionicons'

export default function Star(props: {starred: boolean}) {
  let name = props.starred ? "ios-star" : "ios-star-outline"
  return (
    <Icon style={styles.star} name={name} />
  )
}

const styles = StyleSheet.create({
  star: {
    fontSize: 30,
    color: "#97b13d",
    // TODO: Move this margin out of this component?
    marginLeft: 15
  }
})
