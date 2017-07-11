import * as React from 'react'
import { StyleSheet } from 'react-native'
import Button from 'react-native-button'
import Icon from 'react-native-vector-icons/Ionicons'

export default function Star(props: {starred: boolean, onToggled: () => void}) {
  let name = props.starred ? "ios-star" : "ios-star-outline"
  return (
    <Button onPress={props.onToggled}>
      <Icon style={styles.star} name={name} />
    </Button>
  )
}

const styles = StyleSheet.create({
  star: {
    fontSize: 30,
    // TODO: Move this margin out of this component?
    marginLeft: 15
  }
})
