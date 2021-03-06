import * as React from 'react'
import {
  ScrollView,
  Text,
  TextStyle,
  StyleSheet,
  Linking,
  View,
  TouchableOpacity
} from 'react-native'
// import Icon from 'react-native-vector-icons/Ionicons'

import { CampsiteWithStarred, Position, BookingsInfo } from '../libs/types'
import Star from '../components/Star'
import TextWithTick from '../components/TextWithTick'
import * as TextFormatter from '../libs/TextFormatter'
import Button from './StandardButton'

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
            <TouchableOpacity onPress={this.props.onStarToggled}>
              <Star starred={this.props.campsite.starred} size={34} />
            </TouchableOpacity>
          </View>
          <DescriptionText description={this.props.campsite.description} />
          <Section heading="Facilities" fields={facilitiesFields} />
          <Section heading="Access" fields={accessFields} />
          <Booking booking={this.props.campsite.bookings}/>
          <Button onPress={() => { this.onPress() }}>
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

function Booking(props: {booking: BookingsInfo | null | undefined}) {
  if (props.booking === undefined) {
    // TODO: Not sure this is the right thing to do and consistent with everything else
    return null
  } else if (props.booking === null) {
    return (
      <View style={{marginBottom: 20}}>
        <Text style={styles.sectionHeading}>Booking</Text>
        <Text style={styles.list}>Booking not available. It's first come, first served.</Text>
      </View>
    )
  } if (props.booking.phone === null && props.booking.url === null) {
    return (
      <View style={{marginBottom: 20}}>
        <Text style={styles.sectionHeading}>Booking</Text>
        <Text style={styles.list}>Booking is available but there is no contact information.</Text>
      </View>
    )
  } else {
    return (
      <View>
        <View style={{marginTop: 10, marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flex: 1, paddingRight: 10}}>
            <BookOnlineButton url={props.booking.url} />
          </View>
          <View style={{flex: 1, paddingLeft: 10}}>
            <PhoneButton info={props.booking.phone} />
          </View>
        </View>
      </View>
    )
  }
}

function openURL(url: string | null) {
  if (url) {
    Linking.openURL(url)
  }
}

function BookOnlineButton(props: {url: string | null}) {
  let disabled = props.url ? false : true
  return (
    <Button onPress={() => openURL(props.url)} disabled={disabled}>
      Book online
    </Button>
  )
}

function startPhoneCall(info: {number: string, name?: string} | null) {
  if (info) {
    Linking.openURL(`tel:${info.number}`)
  }
}

function PhoneButton(props: {info: {number: string} | null}) {
  // let label = props.info.name ? props.info.name : props.info.number
  let disabled = props.info ? false : true
  return (
    <Button onPress={() => {startPhoneCall(props.info)}} disabled={disabled}>
      Book by phone
    </Button>
  )
}

function Section(props: {fields: TextFormatter.Fields, heading: string}) {
  let haveText = TextFormatter.listAsTextCapitalized(props.fields.have)
  let notHaveText = TextFormatter.listAsTextCapitalized(props.fields.notHave)
  let unknownText = TextFormatter.listAsTextCapitalized(props.fields.unknown)

  return (
    <View style={{marginBottom: 10}}>
      <Text style={styles.sectionHeading}>{props.heading}</Text>
      <TextWithTick value={true}>{haveText}</TextWithTick>
      <TextWithTick value={false}>{notHaveText}</TextWithTick>
      <TextWithTick value={null}>{unknownText}</TextWithTick>
    </View>
  )
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
  description: {
    fontSize: 20,
    marginBottom: 20
  },
  sectionHeading: {
    fontWeight: 'bold' as 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  list: {
    fontSize: 20,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#777',
    flex: 1,
    fontWeight: "500"
  },
  icon: {
    fontSize: 26,
    marginRight: 12
  },
})
