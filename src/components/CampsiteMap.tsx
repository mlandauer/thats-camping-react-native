import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface Props {

}

export default function CampsiteMap(props: Props) {
  return (
    <View style={{padding: 20}}>
      <Text style={styles.paragraph}>
        The future home of maps
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  paragraph: {
    fontSize: 20,
    marginBottom: 10
  },
})
