import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { Campsite } from '../libs/types'

interface Props {
  campsite: Campsite;
}

export default class CampsiteDetailScreen extends React.Component<Props, {}> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>{this.props.campsite.name}</Text>
        <Text style={styles.park}>In {this.props.campsite.parkName}</Text>
        <Text style={styles.description}>{this.props.campsite.description}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
   padding: 20
  },
  heading: {
    fontWeight: 'bold' as 'bold',
    fontSize: 20,
    marginBottom: 10
  },
  park: {
    fontSize: 20,
    marginBottom: 10
  },
  description: {
    fontSize: 20
  }
})
