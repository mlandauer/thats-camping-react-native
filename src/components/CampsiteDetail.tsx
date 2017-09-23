import * as React from 'react'
import {
  ScrollView,
  Text,
  TextStyle,
  StyleSheet,
  Linking,
  View
} from 'react-native'
import Button from 'react-native-button'
import Icon from 'react-native-vector-icons/Ionicons'

import { CampsiteWithStarred, Position } from '../libs/types'
import Star from '../components/Star'
import * as TextFormatter from '../libs/TextFormatter'

interface Props {
  campsite: CampsiteWithStarred;
  onStarToggled: () => void;
}

export default class CampsiteDetail extends React.Component<Props, {}> {
  render() {
    let facilitiesFields = TextFormatter.facilitiesFields(this.props.campsite.facilities)
    let accessFields = TextFormatter.accessFields(this.props.campsite.access)

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.heading}>{this.props.campsite.name}</Text>
              <Text style={styles.park}>{this.props.campsite.parkName}</Text>
            </View>
            <Button onPress={this.props.onStarToggled}>
              <Star starred={this.props.campsite.starred} size={34} />
            </Button>
          </View>
          <DescriptionText description={this.props.campsite.description} />
          <Section heading="Facilities" fields={facilitiesFields} />
          <Section heading="Access" fields={accessFields} />
          <Button
            containerStyle={styles.buttonContainer}
            style={styles.buttonText}
            onPress={() => { this.onPress() }}>
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

function Section(props: {fields: TextFormatter.Fields, heading: string}) {
  let haveText = TextFormatter.listAsTextCapitalized(props.fields.have)
  let notHaveText = TextFormatter.listAsTextCapitalized(props.fields.notHave)

  if (haveText || notHaveText) {
    return (
      <View style={{marginBottom: 10}}>
        <Text style={styles.sectionHeading}>{props.heading}</Text>
        <Have text={haveText} />
        <NotHave text={notHaveText} />
      </View>
    )
  } else {
    return null
  }
}

function Have(props: {text: string | null}) {
  return (
    <Description tick={true} text={props.text} />
  )
}

function NotHave(props: {text: string | null}) {
  return (
    <Description tick={false} text={props.text} />
  )
}

function Description(props: {tick: boolean, text: string | null}) {
  let name = props.tick ? "ios-checkmark" : "ios-close"
  if (props.text) {
    return (
      <View style={{flexDirection: 'row'}}>
        <Icon style={styles.icon} name={name} />
        <Text style={styles.list}>{props.text}</Text>
      </View>
    )
  } else {
    return null
  }
}

function DescriptionText(props: { description: string }) {
  return (
    <HideText style={styles.description} text={props.description} />
  )
}

function HideText(props: { text: string, style: TextStyle }) {
  if (props.text == "") {
    return null
  } else {
    return (
      <Text style={props.style}>{props.text}</Text>
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
  icon: {
    fontSize: 26,
    marginRight: 10
  },
  description: {
    fontSize: 20,
    marginBottom: 20
  },
  list: {
    fontSize: 20,
    marginBottom: 10,
    flex: 1
  },
  sectionHeading: {
    fontWeight: 'bold' as 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  buttonContainer: {
    padding: 10,
    marginTop: 10,
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
