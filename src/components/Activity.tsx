import * as React from 'react'
import {
  View,
  ActivityIndicator,
  StyleSheet
} from 'react-native'

export default function Activity(props: {active: boolean}) {
  if (props.active) {
    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <ActivityIndicator animating={true} style={{margin: 10}}/>
        </View>
      </View>
    )
  } else {
    return null
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    zIndex: 100,
    width: "100%",
    alignItems: 'center'
  },
  box: {
    backgroundColor: '#fff',
    width: 50
  }
})
