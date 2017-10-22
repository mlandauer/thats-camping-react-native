import * as React from 'react'
import { StyleSheet } from 'react-native'
import Button from 'react-native-button'

interface Props {
  onPress?: () => void;
  children: any;
}

export default function StandardButton(props: Props) {
  return (
    <Button
      containerStyle={styles.buttonContainer}
      style={styles.buttonText}
      onPress={props.onPress} >
      {props.children}
    </Button>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
    paddingBottom: 12,
    borderRadius: 4,
    borderWidth: 0.5
  },
  buttonText: {
    fontSize: 18,
    color: '#777'
  }
})
