import * as React from 'react'
import { StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export default function Star(props: {starred: boolean, size: number}) {
  let name = props.starred ? "ios-star" : "ios-star-outline"
  return (
    <Icon style={[styles.star, {fontSize: props.size}]} name={name} />
  )
}

const styles = StyleSheet.create({
  star: {
    color: "#97b13d",
    // TODO: Move this margin out of this component?
    marginLeft: 10
  }
})
