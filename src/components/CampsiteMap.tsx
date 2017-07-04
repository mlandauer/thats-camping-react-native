import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import * as MapView from 'react-native-maps'

interface Props {

}

export default function CampsiteMap(props: Props) {
  console.log("mapview", MapView)
  return (
    <MapView style={{flex: 1}}/>
  )
}

const styles = StyleSheet.create({
  paragraph: {
    fontSize: 20,
    marginBottom: 10
  },
})
