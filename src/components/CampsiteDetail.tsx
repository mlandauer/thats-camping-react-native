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

import { CampsiteWithStarred, Position, Facilities, Access } from '../libs/types'
import Star from '../components/Star'
import * as TextFormatter from '../libs/TextFormatter'

interface Props {
  campsite: CampsiteWithStarred;
  onStarToggled: () => void;
}

export default class CampsiteDetail extends React.Component<Props, {}> {
  render() {
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
          <FacilitiesSection facilities={this.props.campsite.facilities} />
          <AccessSection access={this.props.campsite.access} />
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

function AccessSection(props: { access: Access }) {
  let fields = TextFormatter.accessFields(props.access)
  let haveText = TextFormatter.listAsText(fields.have)
  let notHaveText = TextFormatter.listAsText(fields.notHave)
  if (haveText) {
    haveText = TextFormatter.capitalizeFirstLetter(haveText)
    if (notHaveText) {
      notHaveText = TextFormatter.capitalizeFirstLetter(notHaveText)
      return (
        <View>
          <Text style={styles.access}>Access</Text>
          <Have text={haveText} />
          <NotHave text={notHaveText} />
        </View>
      )
    } else {
      return (
        <View>
          <Text style={styles.access}>Access</Text>
          <Have text={haveText} />
        </View>
      )
    }
  } else {
    if (notHaveText) {
      return (
        <View>
          <Text style={styles.access}>Access</Text>
          <NotHave text={notHaveText} />
        </View>
      )
    } else {
      return null
    }
  }
}

function Have(props: {text: string}) {
  return (
    <Description tick={true} text={props.text} />
  )
}

function NotHave(props: {text: string}) {
  return (
    <Description tick={false} text={props.text} />
  )
}

function Description(props: {tick: boolean, text: string}) {
  let name = props.tick ? "ios-checkmark" : "ios-close"
  return (
    <View style={{flexDirection: 'row'}}>
      <Icon style={styles.icon} name={name} />
      <Text style={styles.description}>{props.text}</Text>
    </View>
  )
}

function FacilitiesSection(props: { facilities: Facilities }) {
  let fields = TextFormatter.facilitiesFields(props.facilities)
  let haveText = TextFormatter.listAsText(fields.have)
  let notHaveText = TextFormatter.listAsText(fields.notHave)
  if (haveText) {
    if (notHaveText) {
      return (
        <View>
          <Text style={styles.facilities}>Facilities</Text>
          <Text style={styles.description}>Has {haveText}</Text>
          <Text style={styles.description}>But no {notHaveText}</Text>
        </View>
      )
    } else {
      return (
        <View>
          <Text style={styles.facilities}>Facilities</Text>
          <Text style={styles.description}>Has {haveText}</Text>
        </View>
      )
    }
  } else {
    if (notHaveText) {
      return (
        <View>
          <Text style={styles.facilities}>Facilities</Text>
          <Text style={styles.description}>No {notHaveText}</Text>
        </View>
      )
    } else {
      return null
    }
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
