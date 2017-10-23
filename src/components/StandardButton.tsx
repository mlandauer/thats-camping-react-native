import * as React from 'react'
import { StyleSheet } from 'react-native'
import Button from 'react-native-button'

interface Props {
  onPress?: () => void;
  disabled?: boolean;
  children: any;
}

export default function StandardButton(props: Props) {
  return (
    <Button
      containerStyle={styles.buttonContainer}
      style={styles.buttonText}
      styleDisabled={styles.disabledButtonText}
      onPress={props.onPress}
      disabled={props.disabled === true} >
      {props.children}
    </Button>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
    paddingBottom: 12,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#777'
  },
  buttonText: {
    fontSize: 18,
    color: '#777'
  },
  disabledButtonText: {
    fontSize: 18,
    color: '#ccc'
  }
})
