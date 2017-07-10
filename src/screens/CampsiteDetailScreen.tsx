import * as React from 'react'
import {
  ScrollView,
  Text,
  StyleSheet,
  Linking,
  View
} from 'react-native'
import Button from 'react-native-button'
import Icon from 'react-native-vector-icons/Ionicons'

import { CampsiteWithStarred, Position } from '../libs/types'
import * as TextFormatter from '../libs/TextFormatter'

interface Props {
  campsite: CampsiteWithStarred;
}

export default class CampsiteDetailScreen extends React.Component<Props, {}> {
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flex: 1}}>
              <Text style={styles.heading}>{this.props.campsite.name}</Text>
              <Text style={styles.park}>{this.props.campsite.parkName}</Text>
            </View>
            <Icon style={styles.star} name="ios-star-outline" />
          </View>
          <DescriptionText description={this.props.campsite.description}/>
          <Text style={styles.facilities}>Facilities</Text>
          <Text style={styles.description}>{TextFormatter.facilitiesText(this.props.campsite.facilities)}</Text>
          <Text style={styles.access}>Access</Text>
          <Text style={styles.description}>{TextFormatter.accessText(this.props.campsite.access)}</Text>
          <Button
            containerStyle={styles.buttonContainer}
            style={styles.buttonText}
            onPress={() => {this.onPress()}}>
            Directions to campsite
          </Button>
        </View>
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

interface DescriptionTextProps {
  description: string;
}

function DescriptionText(props: DescriptionTextProps) {
  if (props.description == "") {
    return null
  } else {
    return (
      <Text style={styles.description}>{props.description}</Text>
    )
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
    fontSize: 20,
    flexShrink: 0.6
  },
  park: {
    fontSize: 20,
    color: '#aaa',
    marginBottom: 20
  },
  star: {
    fontSize: 30,
    marginLeft: 15
  },
  description: {
    fontSize: 20,
    marginBottom: 20
  },
  facilities: {
    fontWeight: 'bold' as 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  access: {
    fontWeight: 'bold' as 'bold',
    fontSize: 20,
    marginBottom: 10
  },
  buttonContainer: {
    padding: 10,
    marginTop: 20,
    height: 45,
    overflow: 'hidden',
    borderRadius: 4,
    borderWidth: 0.5
  },
  buttonText: {
    fontSize: 18,
    color: '#777'
  }
})
