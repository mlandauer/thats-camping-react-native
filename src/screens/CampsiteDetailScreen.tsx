import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { Campsite } from '../libs/types'
import * as TextFormatter from '../libs/TextFormatter'

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
        <Text style={styles.facilities}>Facilities</Text>
        <Text style={styles.description}>{TextFormatter.facilitiesText(this.props.campsite.facilities)}</Text>
        <Text style={styles.access}>Access</Text>
        <Text style={styles.description}>{TextFormatter.accessText(this.props.campsite.access)}</Text>
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
    fontSize: 20,
    marginBottom: 10
  },
  facilities: {
    fontWeight: 'bold' as 'bold',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  access: {
    fontWeight: 'bold' as 'bold',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10
  }
})
