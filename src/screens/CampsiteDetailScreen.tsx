import * as React from 'react'
import {
  ScrollView,
  Text,
  StyleSheet,
  Button,
  Linking,
  View
} from 'react-native'

import { Campsite, Position } from '../libs/types'
import * as TextFormatter from '../libs/TextFormatter'

interface Props {
  campsite: Campsite;
}

export default class CampsiteDetailScreen extends React.Component<Props, {}> {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.heading}>{this.props.campsite.name}</Text>
        <Text style={styles.park}>In {this.props.campsite.parkName}</Text>
        <Text style={styles.description}>{this.props.campsite.description}</Text>
        <Text style={styles.facilities}>Facilities</Text>
        <Text style={styles.description}>{TextFormatter.facilitiesText(this.props.campsite.facilities)}</Text>
        <Text style={styles.access}>Access</Text>
        <Text style={styles.description}>{TextFormatter.accessText(this.props.campsite.access)}</Text>
        <Button title="Directions to campsite" onPress={() => {this.onPress()}}/>
      </ScrollView>
    )
  }

  // TODO: Disable button when appropriate
  onPress() {
    let url = mapUrl(this.props.campsite.position)
    if (url != undefined) {
      Linking.openURL(url)
    }
  }
}


function mapUrl(position: Position | null): string | undefined {
  if (position == null) {
    return undefined;
  } else {
    return "https://maps.google.com/maps?" +
      "daddr=" +
      position.lat + "," + position.lng;
  }
}

const styles = StyleSheet.create({
  container: {
   padding: 20
  },
  heading: {
    fontWeight: 'bold' as 'bold',
    fontSize: 17,
    marginBottom: 8
  },
  park: {
    fontSize: 17,
    marginBottom: 8
  },
  description: {
    fontSize: 17,
    marginBottom: 8
  },
  facilities: {
    fontWeight: 'bold' as 'bold',
    fontSize: 17,
    marginTop: 17,
    marginBottom: 8,
  },
  access: {
    fontWeight: 'bold' as 'bold',
    fontSize: 17,
    marginTop: 17,
    marginBottom: 8
  }
})
